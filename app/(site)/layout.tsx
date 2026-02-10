import { Navbar } from "@/components/global/navbar";
import { SophiaFab } from "@/components/sophia/sophia-fab";
import { SophiaChat } from "@/components/sophia/sophia-chat";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      {children}
      <SophiaFab />
      {/* Default SophiaChat without property context — listing pages override via SophiaListingWrapper */}
      <SophiaChat />
    </div>
  );
}
