import * as fs from "fs";
import * as path from "path";

interface Translations {
  [key: string]: string;
}

interface LocaleFiles {
  [locale: string]: string;
}

let translations: { [locale: string]: Translations } = {};
let currentLocale: string = "en";

/**
 * Function to load translations from user-provided file paths.
 * @param localeFiles - An object where the key is the locale (e.g. "en", "fa") and the value is the file path to the JSON.
 */
export function setTranslations(localeFiles: LocaleFiles) {
  for (const [locale, filePath] of Object.entries(localeFiles)) {
    try {
      const fullPath = path.resolve(filePath);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      translations[locale] = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error loading translations for locale "${locale}" from file "${filePath}":`, error);
    }
  }
}

/**
 * Function to set the active locale for translations.
 * @param locale - The locale to switch to (e.g., "en", "fa").
 */
export function setLocale(locale: string) {
  if (!translations[locale]) {
    throw new Error(`Locale "${locale}" not found. Make sure you have provided a valid locale with setTranslations.`);
  }
  currentLocale = locale;
}

/**
 * Function to get the translation for a given key.
 * @param key - The translation key (e.g., "hello").
 * @returns The translated string for the current locale.
 */
export function _(key: string): string {
  const translation = translations[currentLocale] ? translations[currentLocale][key] : undefined;
  return translation || key; // Return key if translation not found.
}
