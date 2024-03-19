import { db, eq } from "@/db";
import { user } from "@/db/drizzle/schema";
import { users } from "@/db/schema/schema";
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

export const getUsername = async (userId: string) => {
  try {
    const username = await db
      .select({
        username: user.username,
      })
      .from(users)
      .where(eq(user.id, userId));

    return username[0].username;
  } catch (error) {
    console.error(error);
  }
};
