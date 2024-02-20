import { createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
) {
  throw new Error("Missing env.SUPABASE_PROJECT_URL");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);
