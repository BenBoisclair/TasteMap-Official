import { Tag } from "~/types/types";

export const checkIfEqualToTags = async (tagName: string): Promise<boolean> => {
  // Fetch the tags from your API
  const tags: Tag[] = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tags`
  ).then(res => res.json());

  // Convert the tagName to a consistent case for comparison (e.g., lowercase)
  const normalizedTagName = tagName.toLowerCase();

  // Check if any tag's name matches the provided tagName
  const tagExists = tags.some(
    tag => tag.name.toLowerCase() === normalizedTagName
  );

  return tagExists; // Return true if a match is found, false otherwise
};
