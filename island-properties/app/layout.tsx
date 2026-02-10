import type { Metadata } from "next";
import "./(site)/globals.css";

export const metadata: Metadata = {
  title: "Island Properties",
  description: "Lean luxury concierge platform for Philippine property assets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
