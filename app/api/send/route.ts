import { Resend } from "resend";
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(payload: ContactPayload) {
  return {
    name: (payload.name ?? "").trim(),
    email: (payload.email ?? "").trim(),
    phone: (payload.phone ?? "").trim(),
    message: (payload.message ?? "").trim(),
  };
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message } = normalize(body);

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: "All form fields are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  if (!resend) {
    return NextResponse.json(
      { message: "Email service is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Island Properties <onboarding@resend.dev>",
      to: [process.env.RESEND_TO_EMAIL ?? "concierge@islandproperties.ph"],
      replyTo: email,
      subject: `Private Inquiry: ${name}`,
      text: [
        "New Island Properties inquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    return NextResponse.json(
      { message: "Your private inquiry was submitted. Our concierge team will contact you shortly." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to send inquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
