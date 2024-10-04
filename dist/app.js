"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTranslations = setTranslations;
exports.setLocale = setLocale;
exports._ = _;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let translations = {};
let currentLocale = "en";
/**
 * Function to load translations from user-provided file paths.
 * @param localeFiles - An object where the key is the locale (e.g. "en", "fa") and the value is the file path to the JSON.
 */
function setTranslations(localeFiles) {
    for (const [locale, filePath] of Object.entries(localeFiles)) {
        try {
            const fullPath = path.resolve(filePath);
            const fileContent = fs.readFileSync(fullPath, "utf-8");
            translations[locale] = JSON.parse(fileContent);
        }
        catch (error) {
            console.error(`Error loading translations for locale "${locale}" from file "${filePath}":`, error);
        }
    }
}
/**
 * Function to set the active locale for translations.
 * @param locale - The locale to switch to (e.g., "en", "fa").
 */
function setLocale(locale) {
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
function _(key) {
    const translation = translations[currentLocale] ? translations[currentLocale][key] : undefined;
    return translation || key; // Return key if translation not found.
}
