"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const defaultState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to submit your request.");
      }

      setStatus("success");
      setFeedback(payload.message ?? "Thank you. We will respond within 24 hours.");
      setForm(defaultState);
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unexpected request error.");
    }
  }

  return (
    <section className="border-t border-brand-emerald/10 bg-brand-cream py-16">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">No Obligation Inquiry</p>
          <h2 className="mt-2 font-heading text-3xl text-brand-emerald sm:text-4xl">
            Speak with a Property Specialist
          </h2>
          <p className="mt-4 max-w-md text-sm text-brand-emerald/75">
            Submit your requirements and a licensed property specialist will provide curated options, 
            legal guidance, and transparent pricing — with no pressure or obligation.
          </p>
          
          <div className="mt-8 space-y-4 text-sm text-brand-emerald/75">
            <div className="flex items-start gap-3">
              <span className="text-brand-gold">✓</span>
              <p><strong className="text-brand-emerald">24-Hour Response</strong> — Real person replies, not automated system</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-gold">✓</span>
              <p><strong className="text-brand-emerald">Privacy Protected</strong> — Your contact details never shared or sold</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-gold">✓</span>
              <p><strong className="text-brand-emerald">Korean Language Available</strong> — Request 한국어 support in your message</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-gold">✓</span>
              <p><strong className="text-brand-emerald">Attorney-Backed</strong> — Legal compliance verified by licensed Philippine attorney</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="glass-panel space-y-4 rounded-3xl border-brand-emerald/15 bg-white/55 p-6"
        >
          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
            Name
            <input
              required
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
              placeholder="Your full name"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
              Phone / KakaoTalk
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
                placeholder="+82 or KakaoTalk ID"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
            What are you looking for?
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
              placeholder="Property type, budget range, timeline, SRRV interest, fractional vs full ownership, etc."
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex rounded-full bg-brand-emerald px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream transition hover:bg-[#05583a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Send Inquiry (No Obligation)"}
          </button>

          {feedback ? (
            <p
              className={`text-sm ${
                status === "success" ? "text-[#0f8c50]" : "text-[#9d2130]"
              }`}
            >
              {feedback}
            </p>
          ) : null}
          
          <p className="text-xs text-brand-emerald/60">
            By submitting, you agree to receive property information. Unsubscribe anytime. Your data stays private.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
