import { languages } from "../constants/languages";

/**
 * Returns the name of the language with the given slug.
 * @param slug - the unique identifier of the language
 * @returns the name of the language, or "Select a language" if the language is not found
 */
export function getLanguageName(slug: string): string {
  const language = languages.find((lang) => lang.slug === slug);
  return language? language.name : "Select a language";
}

/**
 * Returns the flag of the language with the given slug.
 * @param slug - the unique identifier of the language
 * @returns the flag of the language, or an empty string if the language is not found
 */
export function getLanguageFlag(slug: string): string {
  const language = languages.find((lang) => lang.slug === slug);
  return language? language.flag : "";
}
