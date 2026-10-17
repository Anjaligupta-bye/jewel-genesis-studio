import { describe, expect, it } from "vitest";
import { EMPTY_ENQUIRY, validateEnquiry } from "@/lib/enquiry";

const valid = { ...EMPTY_ENQUIRY, fullName: "A B", company: "Co", email: "a@b.com", service: "CAD Design", description: "A ring concept brief" };

describe("enquiry validation", () => {
  it("accepts a complete enquiry without optional fields", () => {
    expect(validateEnquiry(valid)).toEqual({});
  });
  it("requires name, company, email, service and description", () => {
    expect(Object.keys(validateEnquiry(EMPTY_ENQUIRY)).sort()).toEqual(["company", "description", "email", "fullName", "service"]);
  });
  it("rejects an invalid email", () => {
    expect(validateEnquiry({ ...valid, email: "not-an-email" }).email).toBeDefined();
  });
});
