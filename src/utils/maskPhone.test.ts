import { maskPhone } from "@/utils/maskPhone";

describe("maskPhone", () => {
  it("formats 11-digit phone number correctly", () => {
    expect(maskPhone("11987654321")).toBe("(11) 9 8765-4321");
  });

  it("formats 10-digit phone number correctly", () => {
    expect(maskPhone("1132654321")).toBe("(11) 3265-4321");
  });

  it("removes non-numeric characters before formatting", () => {
    expect(maskPhone("(11)98765-4321")).toBe("(11) 9 8765-4321");
    expect(maskPhone("11a9876b5432c1")).toBe("(11) 9 8765-4321");
  });

  it("handles short inputs with partial formatting", () => {
    expect(maskPhone("1")).toBe("(1");
    expect(maskPhone("11")).toBe("(11");
    expect(maskPhone("119")).toBe("(11) 9");
    expect(maskPhone("1198")).toBe("(11) 98");
  });

  it("limits input to maximum of 11 digits", () => {
    expect(maskPhone("1198765432199")).toBe("(11) 9 8765-4321");
  });

  it("returns empty string for input with no digits", () => {
    expect(maskPhone("")).toBe("");
    expect(maskPhone("abc")).toBe("");
  });
});
