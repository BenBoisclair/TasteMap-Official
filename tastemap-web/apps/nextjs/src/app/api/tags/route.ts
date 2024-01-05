import { asc, db, desc, eq, sql } from "@acme/db";
import { review, tag, vendor } from "@acme/db/schema/schema";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const allTags = await db.query.tag.findMany();

  return Response.json(allTags);
};
