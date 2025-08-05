import { describe, it, expect } from "vitest";
import { formatTimeSpent } from "../src/lib/utils"; // adjust the path as needed

describe("formatTimeSpent", () => {
  it("returns 0 minutes for invalid dates", () => {
    expect(formatTimeSpent("invalid", "invalid")).toBe("0 minutes");
    expect(formatTimeSpent("2025-08-01", "2025-07-01")).toBe("0 minutes"); // end < start
  });

  it("returns minutes only", () => {
    const start = new Date("2025-08-01T10:00:00Z");
    const end = new Date("2025-08-01T10:05:00Z");
    expect(formatTimeSpent(start, end)).toBe("5 minutes");
  });

  it("returns hours and minutes", () => {
    const start = new Date("2025-08-01T10:00:00Z");
    const end = new Date("2025-08-01T11:45:00Z");
    expect(formatTimeSpent(start, end)).toBe("1 hour 45 minutes");
  });

  it("returns hours only", () => {
    const start = new Date("2025-08-01T10:00:00Z");
    const end = new Date("2025-08-01T12:00:00Z");
    expect(formatTimeSpent(start, end)).toBe("2 hours");
  });

  it("returns days, hours, and minutes", () => {
    const start = new Date("2025-08-01T08:00:00Z");
    const end = new Date("2025-08-03T10:30:00Z");
    expect(formatTimeSpent(start, end)).toBe("2 days 2 hours 30 minutes");
  });

  it("returns days only", () => {
    const start = new Date("2025-08-01T00:00:00Z");
    const end = new Date("2025-08-04T00:00:00Z");
    expect(formatTimeSpent(start, end)).toBe("3 days");
  });

  it("returns days and hours", () => {
    const start = new Date("2025-08-01T00:00:00Z");
    const end = new Date("2025-08-04T03:00:00Z");
    expect(formatTimeSpent(start, end)).toBe("3 days 3 hours");
  });

  it("works with string inputs", () => {
    const start = "2025-08-01T10:00:00Z";
    const end = "2025-08-01T10:30:00Z";
    expect(formatTimeSpent(start, end)).toBe("30 minutes");
  });

  it("returns 0 minutes if start and end are the same", () => {
    const time = "2025-08-01T10:00:00Z";
    expect(formatTimeSpent(time, time)).toBe("0 minutes");
  });
});
