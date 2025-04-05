import { maskCPF } from "@/utils/maskCPF";

describe("maskCPF", () => {
  it("formats a numeric CPF correctly", () => {
    expect(maskCPF("12345678900")).toBe("123.456.789-00");
  });

  it("removes non-numeric characters before formatting", () => {
    expect(maskCPF("123.456.789-00")).toBe("123.456.789-00");
    expect(maskCPF("123a456b789c00")).toBe("123.456.789-00");
  });

  it("returns a partial mask if value is incomplete", () => {
    expect(maskCPF("123")).toBe("123");
    expect(maskCPF("1234")).toBe("123.4");
    expect(maskCPF("1234567")).toBe("123.456.7");
  });

  it("returns an empty string if input is empty or contains no digits", () => {
    expect(maskCPF("")).toBe("");
    expect(maskCPF("abc")).toBe("");
  });
});
