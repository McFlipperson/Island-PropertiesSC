import { ContactForm } from "@/components/contact/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Sikat Properties",
  description:
    "Get in touch with Sikat Properties. Connect with our team for private viewings, investment inquiries, or questions about owning property in Bohol.",
  openGraph: {
    title: "Contact Sikat Properties",
    description:
      "Reach out to schedule a viewing or discuss your property investment in Bohol.",
    url: "https://sikatproperties.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="pb-28">
      {/* Hero Section */}
      <section className="relative h-96 w-full overflow-hidden bg-brand-emerald">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-emerald/80 to-brand-emerald"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
            Get in Touch
          </p>
          <h1 className="font-heading max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Let's Connect
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/80 sm:text-lg">
            Whether you're ready to view a property, discuss investment opportunities, or have questions about Bohol real estate — we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods + Form */}
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-8 lg:col-span-1">
          {/* WhatsApp */}
          <div className="rounded-2xl border border-brand-emerald/15 bg-white/70 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/15">
              <span className="text-xl">💬</span>
            </div>
            <h3 className="font-heading text-lg text-brand-emerald">WhatsApp</h3>
            <p className="mt-2 text-sm text-brand-emerald/70">
              Chat directly with our team for quick answers.
            </p>
            <a
              href="https://wa.me/639764065753"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-brand-gold hover:underline"
            >
              +63 976 406 5753 →
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl border border-brand-emerald/15 bg-white/70 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15">
              <span className="text-xl">📞</span>
            </div>
            <h3 className="font-heading text-lg text-brand-emerald">Phone</h3>
            <p className="mt-2 text-sm text-brand-emerald/70">
              Speak with a property consultant directly.
            </p>
            <a
              href="tel:+639764065753"
              className="mt-3 inline-flex text-sm font-semibold text-brand-gold hover:underline"
            >
              +63 976 406 5753 →
            </a>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-brand-emerald/15 bg-white/70 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/15">
              <span className="text-xl">✉️</span>
            </div>
            <h3 className="font-heading text-lg text-brand-emerald">Email</h3>
            <p className="mt-2 text-sm text-brand-emerald/70">
              Detailed inquiries answered within 24 hours.
            </p>
            <a
              href="mailto:nova@sikatproperties.com"
              className="mt-3 inline-flex text-sm font-semibold text-brand-gold hover:underline"
            >
              nova@sikatproperties.com →
            </a>
          </div>

          {/* Hours */}
          <div className="rounded-2xl border border-brand-emerald/15 bg-white/70 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-emerald/15">
              <span className="text-xl">🕐</span>
            </div>
            <h3 className="font-heading text-lg text-brand-emerald">Office Hours</h3>
            <p className="mt-2 text-sm text-brand-emerald/70">
              Mon–Sat, 9:00 AM – 6:00 PM <br />
              Philippine Time (UTC+8)
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-brand-emerald/10 bg-white/60 p-8 shadow-glass">
            <h2 className="font-heading text-2xl text-brand-emerald">Send us a message</h2>
            <p className="mt-2 text-sm text-brand-emerald/70">
              Tell us about your property goals — viewing, investment, lifestyle questions, or just to chat. We'll respond promptly.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-brand-emerald/10 bg-brand-emerald/5 p-8 text-center">
          <p className="text-sm text-brand-emerald/70">
            Questions before you reach out? Explore our{" "}
            <a href="/guide" className="font-semibold text-brand-gold hover:underline">
              legal guide
            </a>
            {" "}or browse{" "}
            <a href="/listings" className="font-semibold text-brand-gold hover:underline">
              available properties
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
