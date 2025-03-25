/**
 * Converts a string to a URL-friendly slug
 * - Converts to lowercase
 * - Removes special characters
 * - Replaces spaces with hyphens
 * - Removes leading and trailing hyphens
 * - Handles Czech characters
 */
export const slugify = (text: string): string => {
  // Czech character mapping
  const czechMap: { [key: string]: string } = {
    á: "a",
    č: "c",
    ď: "d",
    é: "e",
    ě: "e",
    í: "i",
    ň: "n",
    ó: "o",
    ř: "r",
    š: "s",
    ť: "t",
    ú: "u",
    ů: "u",
    ý: "y",
    ž: "z",
    Á: "A",
    Č: "C",
    Ď: "D",
    É: "E",
    Ě: "E",
    Í: "I",
    Ň: "N",
    Ó: "O",
    Ř: "R",
    Š: "S",
    Ť: "T",
    Ú: "U",
    Ů: "U",
    Ý: "Y",
    Ž: "Z",
  };

  // Replace Czech characters
  let result = text
    .split("")
    .map((char) => czechMap[char] || char)
    .join("");

  return result
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

/**
 * Generates a unique slug by appending a number if necessary
 * @param baseSlug The initial slug
 * @param existingSlugs Array of existing slugs to check against
 * @returns A unique slug
 */
export const generateUniqueSlug = (
  baseSlug: string,
  existingSlugs: string[]
): string => {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};
