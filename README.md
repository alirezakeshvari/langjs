# langjs

`langjs` is a lightweight multi-language support package for TypeScript/JavaScript projects. It allows developers to define their own translation files in JSON format, switch between languages dynamically, and fetch localized strings for their applications.

## Features

- Dynamically load translation files (JSON format).
- Easily switch between multiple languages.
- Simple API to retrieve translations for any key.
- TypeScript support for type safety.

## Installation

You can install `langjs` from npm:

```bash
npm install langjs
```

Or using Yarn:

```bash
yarn add langjs
```

## Usage

### 1. Setting up your translation files

Define your translations in JSON files for each language. For example, create `en.json` and `fa.json` like this:

- `en.json`

```json
{
  "hello": "Hello",
  "goodbye": "Goodbye"
}
```

- `fa.json`

```json
{
  "hello": "سلام",
  "goodbye": "خداحافظ"
}
```

### 2. Providing the paths to your translation files

In your project, use the `setTranslations` function to provide the paths to your translation files:

```ts
import { setTranslations, setLocale, _ } from "langjs";

// Set paths to your translation files
setTranslations({
  en: "./path/to/en.json",
  fa: "./path/to/fa.json",
});
```

### 3. Switching between locales

Use the `setLocale` function to switch between languages:

```ts
// Set locale to English
setLocale("en");
console.log(_("hello")); // Outputs: Hello

// Set locale to Farsi
setLocale("fa");
console.log(_("hello")); // Outputs: سلام
```

### 4. Fetching translations

Use the `_` function to get translations based on the current locale:

```ts
console.log(_("goodbye")); // Outputs the translation for the current locale
```

If a translation key is not found, the key itself will be returned:

```ts
console.log(_("nonexistent_key")); // Outputs: nonexistent_key
```

## API

### `setTranslations(localeFiles: { [locale: string]: string }): void`

Sets the paths to your translation files. The object keys represent the locale code (e.g., `en`, `fa`), and the values represent the file paths to the respective JSON files.

- `localeFiles`: An object where the key is the locale (e.g., `"en"`, `"fa"`) and the value is the file path to the JSON file.

### `setLocale(locale: string): void`

Sets the active locale for translations. This locale will be used to fetch translations when calling `_`.

- `locale`: The locale to switch to (e.g., `"en"`, `"fa"`).

### `_ (key: string): string`

Fetches the translation for the given key from the currently set locale. If the key does not exist, it returns the key itself.

- `key`: The key for which to get the translation (e.g., `"hello"`).

## Example Project Setup

```ts
import { setTranslations, setLocale, _ } from "langjs";

// Set the translation files for English and Farsi
setTranslations({
  en: "./translations/en.json",
  fa: "./translations/fa.json",
});

// Switch to English
setLocale("en");
console.log(_("hello")); // Outputs: Hello

// Switch to Farsi
setLocale("fa");
console.log(_("hello")); // Outputs: سلام
```

## Running Tests

You can run the unit tests with Jest. First, ensure that you've set up your project with the required development dependencies:

```bash
npm install
```

Then, run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.
