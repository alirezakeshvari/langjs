import { setTranslations, setLocale, _ } from "../src/app";
import * as fs from "fs";

// Mock the fs module to simulate file reading
jest.mock("fs");

describe("Multi-Language Package", () => {
  beforeAll(() => {
    // Mocking file system reading for the user-provided paths
    (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath.includes("en.json")) {
        return JSON.stringify({ hello: "Hello", goodbye: "Goodbye" });
      } else if (filePath.includes("fa.json")) {
        return JSON.stringify({ hello: "سلام", goodbye: "خداحافظ" });
      }
      return "{}";
    });
  });

  afterAll(() => {
    jest.resetAllMocks(); // Reset all mock data after tests
  });

  it("should load translations from JSON files", () => {
    // Simulate setting user-provided paths
    setTranslations({
      en: "./test/en.json",
      fa: "./test/fa.json",
    });

    // Verify translations are loaded correctly
    setLocale("en");
    expect(_("hello")).toBe("Hello");
    expect(_("goodbye")).toBe("Goodbye");

    setLocale("fa");
    expect(_("hello")).toBe("سلام");
    expect(_("goodbye")).toBe("خداحافظ");
  });

  it("should return key if translation is not found", () => {
    setLocale("en");
    expect(_("nonexistent_key")).toBe("nonexistent_key"); // Translation does not exist
  });

  it("should throw an error for unsupported locale", () => {
    expect(() => {
      setLocale("es"); // Locale 'es' has not been loaded
    }).toThrow('Locale "es" not found. Make sure you have provided a valid locale with setTranslations.');
  });
});
