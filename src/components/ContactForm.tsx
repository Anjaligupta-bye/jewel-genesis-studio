import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { EMPTY_ENQUIRY, SERVICE_OPTIONS, validateEnquiry, type Enquiry } from "@/lib/enquiry";
import { CONTACT } from "@/lib/contact-details";
import { cn } from "@/lib/utils";

// Set VITE_ENQUIRY_ENDPOINT to a form service URL (e.g. Formspree) or connect a backend to deliver enquiries.
const ENDPOINT = import.meta.env["VITE_ENQUIRY_ENDPOINT"] as string | undefined;

type Status = { kind: "idle" | "loading" | "success" | "error"; msg?: string };

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean | undefined; error?: string | undefined; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-[0.65rem] tracking-[0.25em] uppercase text-foreground/60">
        {label} {optional ? <span className="text-foreground/40">(optional)</span> : <span className="text-gold">*</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

const inputCls = (err?: string) =>
  cn("w-full border-0 border-b bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-gold", err ? "border-destructive" : "border-input");

export function ContactForm() {
  const [v, setV] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string | undefined>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (k: keyof Enquiry) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const a = (k: keyof Enquiry) => ({ id: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(v);
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus({ kind: "idle" }); return; }
    setStatus({ kind: "loading" });
    if (!ENDPOINT) {
      await new Promise((r) => setTimeout(r, 600));
      setStatus({ kind: "error", msg: `Online enquiries aren't connected yet, so this message was not sent. Please email us at ${CONTACT.email}.` });
      return;
    }
    try {
      const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(v) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "success", msg: "Thank you — your enquiry has been sent. We'll be in touch soon." });
      setV(EMPTY_ENQUIRY);
    } catch {
      setStatus({ kind: "error", msg: "We couldn't send your enquiry. Please try again or email us directly." });
    }
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 md:grid-cols-2">
      <Field id="fullName" label="Full name" error={errors.fullName}><input {...a("fullName")} autoComplete="name" value={v.fullName} onChange={set("fullName")} className={inputCls(errors.fullName)} /></Field>
      <Field id="company" label="Company name" error={errors.company}><input {...a("company")} autoComplete="organization" value={v.company} onChange={set("company")} className={inputCls(errors.company)} /></Field>
      <Field id="email" label="Email address" error={errors.email}><input {...a("email")} type="email" autoComplete="email" value={v.email} onChange={set("email")} className={inputCls(errors.email)} /></Field>
      <Field id="phone" label="Phone number" optional><input {...a("phone")} type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} className={inputCls()} /></Field>
      <Field id="service" label="Service required" error={errors.service}>
        <select {...a("service")} value={v.service} onChange={set("service")} className={cn(inputCls(errors.service), "bg-background")}>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field id="material" label="Material preference" optional>
        <input {...a("material")} placeholder="e.g. 925 Silver, Gold, Lab-grown diamonds" value={v.material} onChange={set("material")} className={inputCls()} />
      </Field>
      <div className="md:col-span-2">
        <Field id="description" label="Project description" error={errors.description}>
          <textarea {...a("description")} rows={5} value={v.description} onChange={set("description")} className={cn(inputCls(errors.description), "resize-none")} placeholder="Tell us about your idea, design requirements or manufacturing project." />
        </Field>
      </div>
      <div className="flex flex-col gap-6 md:col-span-2">
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-primary px-10 text-[0.7rem] font-semibold tracking-[0.3em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-ivory disabled:opacity-70 md:w-auto md:self-start"
        >
          {status.kind === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : "Send enquiry"}
        </button>
        <AnimatePresence mode="wait">
          {(status.kind === "success" || status.kind === "error") && (
            <motion.p
              key={status.kind}
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn("border-l-2 pl-4 text-sm", status.kind === "success" ? "border-gold text-foreground" : "border-destructive text-foreground/80")}
            >
              {status.msg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
