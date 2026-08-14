import { describe, expect, it } from "vitest";

import { enquirySchema, newsletterSchema } from "./forms";

describe("newsletterSchema", () => {
  it("accepts a valid address", () => {
    expect(newsletterSchema.safeParse({ email: "sam@yourbusiness.co" }).success).toBe(true);
  });

  it("rejects a malformed address", () => {
    const result = newsletterSchema.safeParse({ email: "sam@" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty address with the required message", () => {
    const result = newsletterSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });
});

describe("enquirySchema", () => {
  const valid = {
    name: "Sam Okafor",
    email: "sam@yourbusiness.co",
    problem: "We're re-typing every order into two systems and it's costing us a day a week.",
  };

  it("accepts a complete enquiry", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a one-word problem description", () => {
    expect(enquirySchema.safeParse({ ...valid, problem: "slow" }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(enquirySchema.safeParse({ ...valid, company: "spam co" }).success).toBe(false);
  });

  it("allows an omitted honeypot", () => {
    expect(enquirySchema.safeParse({ ...valid, company: "" }).success).toBe(true);
  });
});
