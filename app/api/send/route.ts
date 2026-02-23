import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  language?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(payload: ContactPayload) {
  return {
    name: (payload.name ?? "").trim(),
    email: (payload.email ?? "").trim(),
    phone: (payload.phone ?? "").trim(),
    message: (payload.message ?? "").trim(),
    language: (payload.language ?? "en").trim(),
  };
}

function buildEmailText(name: string, email: string, phone: string, message: string, language: string): string {
  const isKorean = language === "ko";

  if (isKorean) {
    return [
      "=== Island Properties SC — 새로운 문의 ===",
      "",
      `이름: ${name}`,
      `이메일: ${email}`,
      `전화번호: ${phone}`,
      "",
      "메시지:",
      message,
      "",
      "---",
      "Island Properties SC 컨시어지 시스템",
    ].join("\n");
  }

  return [
    "=== Island Properties SC — New Private Inquiry ===",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    "Message:",
    message,
    "",
    "---",
    "Island Properties SC Concierge System",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message, language } = normalize(body);

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "All form fields are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? gmailUser;

  if (!gmailUser || !gmailPass) {
    console.error("[contact-form] Gmail SMTP not configured — missing GMAIL_USER or GMAIL_APP_PASSWORD");
    return NextResponse.json(
      { message: "Email service is not configured. Please try again later." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const subject = language === "ko"
    ? `[아일랜드 프로퍼티스] 비공개 문의: ${name}`
    : `[Island Properties SC] Private Inquiry: ${name}`;

  const emailText = buildEmailText(name, email, phone, message, language);

  try {
    await transporter.sendMail({
      from: `"Island Properties SC" <${gmailUser}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text: emailText,
    });

    const successMsg = language === "ko"
      ? "문의가 접수되었습니다. 컨시어지 팀이 곧 연락드리겠습니다."
      : "Your private inquiry was submitted. Our concierge team will contact you shortly.";

    return NextResponse.json({ message: successMsg }, { status: 200 });
  } catch (err) {
    console.error("[contact-form] Failed to send email:", err);
    return NextResponse.json(
      { message: "Unable to send inquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
