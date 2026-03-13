"use client";

export function WhatsAppFab() {
  const whatsappUrl = "https://wa.me/639764065753";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-5 z-[54] flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition hover:translate-y-[-2px] hover:shadow-xl"
      title="Chat on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        className="w-full h-full object-cover rounded-full"
      />
    </a>
  );
}
