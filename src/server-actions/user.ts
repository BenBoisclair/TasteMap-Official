import { db, eq } from "@/db";
import { user } from "@/db/drizzle/schema";
import { auth } from "@clerk/nextjs";

export const getUserId = async (): Promise<string | null> => {
  const { userId: externalId } = auth();
  if (!externalId) return null;
  const userId = await db
    .select()
    .from(user)
    .where(eq(user.externalId, externalId));
  if (userId.length) {
    return userId[0].id;
  }
  return null;
};
