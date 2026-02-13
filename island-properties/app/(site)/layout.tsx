import { Navbar } from "@/components/global/navbar";
import { SaraFab } from "@/components/sara-components/sara-fab";
import { SaraChat } from "@/components/sara-components/sara-chat";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      {children}
      <SaraFab />
      {/* Default SaraChat without property context — listing pages override via SaraListingWrapper */}
      <SaraChat />
    </div>
  );
}
