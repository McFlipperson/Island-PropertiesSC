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
      setFeedback(payload.message ?? "Your request has been submitted.");
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
          <p className="text-xs uppercase tracking-[0.24em] text-brand-emerald/70">Private Concierge</p>
          <h2 className="mt-2 font-heading text-3xl text-brand-emerald sm:text-4xl">
            Request Tailored Acquisition Support
          </h2>
          <p className="mt-4 max-w-md text-sm text-brand-emerald/75">
            Submit your requirements and the concierge desk will provide curated options, legal
            pathways, and privacy-aware onboarding.
          </p>
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
              />
            </label>

            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
              Phone
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
              />
            </label>
          </div>

          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-brand-emerald/70">
            Message
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              className="mt-2 w-full rounded-xl border border-brand-emerald/20 bg-white/90 px-3 py-2 text-sm text-brand-emerald outline-none ring-brand-gold/40 transition focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex rounded-full bg-brand-emerald px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream transition hover:bg-[#05583a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Submit Private Inquiry"}
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
        </motion.form>
      </div>
    </section>
  );
}
