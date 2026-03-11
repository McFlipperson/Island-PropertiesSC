"use client";

import { useState } from "react";
import { useTranslations } from "@/lib/i18n/translations";
import { useUIStore } from "@/store/use-ui-store";

export function ContactForm() {
  const locale = useUIStore((s) => s.locale);
  const t = useTranslations(locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Property Inquiry",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Property Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {/* Name */}
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
          {locale === "ko" ? "이름" : "Name"}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-brand-emerald/15 bg-white/80 px-4 py-2.5 text-sm text-brand-emerald placeholder-brand-emerald/40 focus:border-brand-emerald focus:outline-none focus:ring-1 focus:ring-brand-emerald/30"
          placeholder={locale === "ko" ? "이름을 입력하세요" : "Your name"}
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
          {locale === "ko" ? "이메일" : "Email"}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-brand-emerald/15 bg-white/80 px-4 py-2.5 text-sm text-brand-emerald placeholder-brand-emerald/40 focus:border-brand-emerald focus:outline-none focus:ring-1 focus:ring-brand-emerald/30"
          placeholder={locale === "ko" ? "이메일을 입력하세요" : "you@example.com"}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
          {locale === "ko" ? "전화번호" : "Phone"}
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border border-brand-emerald/15 bg-white/80 px-4 py-2.5 text-sm text-brand-emerald placeholder-brand-emerald/40 focus:border-brand-emerald focus:outline-none focus:ring-1 focus:ring-brand-emerald/30"
          placeholder={locale === "ko" ? "+63 976 406 5753" : "+63 976 406 5753"}
        />
      </div>

      {/* Subject */}
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
          {locale === "ko" ? "주제" : "Subject"}
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-brand-emerald/15 bg-white/80 px-4 py-2.5 text-sm text-brand-emerald focus:border-brand-emerald focus:outline-none focus:ring-1 focus:ring-brand-emerald/30"
        >
          <option>Property Viewing Request</option>
          <option>Investment Inquiry</option>
          <option>SRRV Information</option>
          <option>General Question</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="text-xs uppercase tracking-[0.12em] text-brand-emerald/70">
          {locale === "ko" ? "메시지" : "Message"}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-brand-emerald/15 bg-white/80 px-4 py-2.5 text-sm text-brand-emerald placeholder-brand-emerald/40 focus:border-brand-emerald focus:outline-none focus:ring-1 focus:ring-brand-emerald/30"
          placeholder={
            locale === "ko"
              ? "구체적인 질문이나 요청을 입력하세요"
              : "Tell us about your interests or questions..."
          }
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-800">
            {locale === "ko"
              ? "✓ 메시지가 전송되었습니다. 24시간 내에 연락드리겠습니다."
              : "✓ Message sent! We'll reach out within 24 hours."}
          </p>
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-800">
            {locale === "ko"
              ? "✗ 전송 실패. 잠시 후 다시 시도해주세요."
              : "✗ Something went wrong. Please try again."}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-cream transition disabled:opacity-50 hover:bg-brand-emerald/90"
      >
        {isLoading
          ? locale === "ko"
            ? "전송 중..."
            : "Sending..."
          : locale === "ko"
            ? "메시지 전송"
            : "Send Message"}
      </button>
    </form>
  );
}
