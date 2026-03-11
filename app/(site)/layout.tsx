import { Navbar } from "@/components/global/navbar";
import { YunaFab } from "@/components/sophia/sophia-fab";
import { YunaChat } from "@/components/sophia/sophia-chat";
import { WhatsAppFab } from "@/components/whatsapp-fab";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      {children}
      <WhatsAppFab />
      <YunaFab />
      {/* Default YunaChat without property context — listing pages override via YunaListingWrapper */}
      <YunaChat />
    </div>
  );
}
