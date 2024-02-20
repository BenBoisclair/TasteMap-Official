import { supabase } from "./supabase";

export default async function uploadImageToSupabase(
  file: File,
  path: string
): Promise<[string?, string?]> {
  const { data, error } = await supabase.storage
    .from("public-assets")
    .upload(path, file, {
      upsert: true,
    });
  if (error) throw new Error(error.message);
  return [data?.path, undefined];
}
