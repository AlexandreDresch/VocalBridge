import { languages } from "./languages";

export function getLanguageName(slug: string) {
  const language = languages.find((lang) => lang.slug === slug);
  return language ? language.name : "Select a language";
}

export function getLanguageFlag(slug: string) {
  const language = languages.find((lang) => lang.slug === slug);
  return language ? language.flag : "";
}
