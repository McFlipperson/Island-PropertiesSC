import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// POST /api/review-request
// Body: { action: "preview" | "send", name, email, context?, language? }
// "preview" — returns the draft email for Nova to approve
// "send"    — sends the email to the client

type Payload = {
  action: "preview" | "send";
  name: string;
  email: string;
  context?: string; // e.g. "Viewed Palm Oasis, serious inquiry"
  language?: "en" | "ko";
};

const GOOGLE_REVIEW_URL = "https://g.page/r/PLACEHOLDER/review"; // update once GBP is live

function buildReviewEmail(name: string, language: string, context?: string) {
  if (language === "ko") {
    return {
      subject: `${name}님, 소중한 의견을 남겨주세요 — Sikat Properties`,
      text: `안녕하세요 ${name}님,

저희 Sikat Properties에 관심 가져주셔서 진심으로 감사합니다.

귀하의 경험을 Google 리뷰로 공유해 주시면 보홀에서 부동산을 찾는 다른 분들께 큰 도움이 됩니다.

리뷰 작성 (1분 소요):
${GOOGLE_REVIEW_URL}

감사합니다.
Sikat Properties`,
      html: `<p>안녕하세요 <strong>${name}</strong>님,</p>
<p>저희 Sikat Properties에 관심 가져주셔서 진심으로 감사합니다.</p>
<p>귀하의 경험을 Google 리뷰로 공유해 주시면 보홀에서 부동산을 찾는 다른 분들께 큰 도움이 됩니다.</p>
<p><a href="${GOOGLE_REVIEW_URL}" style="background:#1B4332;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">리뷰 작성하기 →</a></p>
<p>감사합니다.<br/>Sikat Properties</p>`,
    };
  }

  return {
    subject: `${name}, a quick favour — Sikat Properties`,
    text: `Hi ${name},

Thank you for connecting with Sikat Properties${context ? ` regarding ${context}` : ""}.

If you have two minutes, a Google review would mean a lot — it helps other buyers find us when they're researching Bohol property.

Leave a review here (takes 2 minutes):
${GOOGLE_REVIEW_URL}

No obligation at all — only if you felt the experience was worth sharing.

Thanks,
Sikat Properties`,
    html: `<p>Hi <strong>${name}</strong>,</p>
<p>Thank you for connecting with Sikat Properties${context ? ` regarding ${context}` : ""}.</p>
<p>If you have two minutes, a Google review would mean a lot — it helps other buyers find us when they&apos;re researching Bohol property.</p>
<p><a href="${GOOGLE_REVIEW_URL}" style="background:#1B4332;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">Leave a Review →</a></p>
<p>No obligation at all — only if you felt the experience was worth sharing.</p>
<p>Thanks,<br/>Sikat Properties</p>`,
  };
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { action, name, email, context, language = "en" } = body;

  if (!name || !email || !action) {
    return NextResponse.json({ error: "name, email and action are required." }, { status: 400 });
  }

  const draft = buildReviewEmail(name, language, context);

  // PREVIEW — return draft for Nova to approve
  if (action === "preview") {
    return NextResponse.json({ preview: draft }, { status: 200 });
  }

  // SEND — Nova approved, send to client
  if (action === "send") {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json({ error: "Gmail not configured." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    try {
      await transporter.sendMail({
        from: `"Sikat Properties" <${gmailUser}>`,
        to: email,
        subject: draft.subject,
        text: draft.text,
        html: draft.html,
      });

      return NextResponse.json({ sent: true, to: email }, { status: 200 });
    } catch (err) {
      console.error("[review-request] Send failed:", err);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
