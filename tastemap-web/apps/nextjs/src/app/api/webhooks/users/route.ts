/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { db, eq } from "@acme/db";
import { users } from "@acme/db/schema/schema";

import { generatePublicId } from "~/utils/generate-id";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  // Assuming you receive the webhook data as 'webhookData'
  // const webhookData = JSON.parse(body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...attributes } = evt.data;

    const roleInput = attributes?.public_metadata?.role;
    const email = attributes.email_addresses[0]?.email_address ?? "";

    let role = "User";

    if (email.endsWith("@taste-map.com")) {
      role = "Admin";
    }

    if (typeof roleInput === "string") {
      role = roleInput;
    }

    const userInfo = {
      id: generatePublicId(),
      externalId: id,
      username: attributes?.username ? `@${attributes?.username}` : "",
      firstName: attributes?.first_name,
      lastName: attributes?.last_name,
      role: role,
      imageUrl: attributes?.image_url.trim(),
      birthday: attributes?.birthday,
      telephone: attributes?.phone_numbers[0]?.phone_number ?? "",
      email: email,
      emailVerified: attributes?.email_addresses[0]?.verification?.status,
    };

    try {
      await db.insert(users).values(userInfo).onConflictDoUpdate({
        target: users.externalId,
        set: userInfo,
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      if (id) {
        const userExists = await db
          .select()
          .from(users)
          .where(eq(users.externalId, id));

        if (userExists) {
          await db.delete(users).where(eq(users.externalId, id));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return new Response("Success", { status: 200 });
}
