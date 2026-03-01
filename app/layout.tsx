import type { Metadata } from "next";
import "./(site)/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Bohol Property for Sale | Freehold CCT Condos for Foreign Buyers | Island Properties",
    template: "%s | Island Properties — Bohol Real Estate",
  },
  description:
    "Buy freehold property in Bohol, Philippines. SRRV-eligible CCT condos from ₱2.9M. Legal foreign ownership available. Panglao, Dauis, Tagbilaran. English & Korean support.",
  keywords: [
    "Bohol property for sale",
    "CCT condo Philippines foreigner",
    "SRRV eligible property Bohol",
    "buy condo Philippines foreign buyer",
    "Panglao real estate",
    "retire Philippines property",
    "freehold condo Philippines",
    "Bohol expat property",
  ],
  authors: [{ name: "Island Properties" }],
  metadataBase: new URL("https://islandpropertiesph.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://islandpropertiesph.com",
    siteName: "Island Properties",
    title: "Bohol Property for Sale | Freehold CCT Condos for Foreign Buyers",
    description:
      "Buy freehold property in Bohol, Philippines. SRRV-eligible CCT condos from ₱2.9M. Legal foreign ownership available. Panglao, Dauis, Tagbilaran.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Island Properties — Bohol Real Estate for Foreign Buyers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bohol Property for Sale | Freehold CCT Condos for Foreign Buyers",
    description:
      "Buy freehold property in Bohol, Philippines. SRRV-eligible CCT condos from ₱2.9M. Legal foreign ownership.",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://islandpropertiesph.com",
  },
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
