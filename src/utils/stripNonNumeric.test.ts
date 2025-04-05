import { stripNonNumeric } from "@/utils/stripNonNumeric";

describe("stripNonNumeric", () => {
  it("removes all non-numeric characters from a string", () => {
    expect(stripNonNumeric("123-456.789")).toBe("123456789");
    expect(stripNonNumeric("(12) 3456-7890")).toBe("1234567890");
    expect(stripNonNumeric("abc123def")).toBe("123");
    expect(stripNonNumeric("00.11.22/0001-33")).toBe("001122000133");
  });

  it("returns empty string when input has no numbers", () => {
    expect(stripNonNumeric("abc-def")).toBe("");
  });

  it("returns the same string if it contains only numbers", () => {
    expect(stripNonNumeric("9876543210")).toBe("9876543210");
  });

  it("handles empty string", () => {
    expect(stripNonNumeric("")).toBe("");
  });
});
