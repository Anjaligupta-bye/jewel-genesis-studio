export const SERVICE_OPTIONS = ["CAD Design", "3D Rendering", "Prototyping", "Manufacturing", "Other"] as const;

export type Enquiry = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  material: string;
};

export const EMPTY_ENQUIRY: Enquiry = { fullName: "", company: "", email: "", phone: "", service: "", description: "", material: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(v: Enquiry): Partial<Record<keyof Enquiry, string>> {
  const e: Partial<Record<keyof Enquiry, string>> = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!v.company.trim()) e.company = "Please enter your company name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!(SERVICE_OPTIONS as readonly string[]).includes(v.service)) e.service = "Please choose a service.";
  if (v.description.trim().length < 10) e.description = "Please describe your project (at least 10 characters).";
  return e;
}
