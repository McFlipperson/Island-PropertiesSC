"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MicOff, Pause, Play, Send, Volume2, X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/use-ui-store";

type Message = {
  id: string;
  role: "user" | "sophia";
  content: string;
  timestamp: Date;
};

export function SophiaChat() {
  const isSophiaOpen = useUIStore((state) => state.isSophiaOpen);
  const closeSophia = useUIStore((state) => state.closeSophia);
  const isSophiaSpeaking = useUIStore((state) => state.isSophiaSpeaking);
  const setSophiaSpeaking = useUIStore((state) => state.setSophiaSpeaking);
  const propertyContext = useUIStore((state) => state.sophiaPropertyContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [sessionId] = useState(() => `sophia-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const [remainingMessages, setRemainingMessages] = useState(50);
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isSophiaOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isSophiaOpen]);

  // Greeting on first open
  useEffect(() => {
    if (isSophiaOpen && !hasGreeted) {
      const greeting = propertyContext
        ? "Welcome — I'm Sophia, your personal property consultant. I see you're exploring one of our exclusive listings. What would you like to know — the investment potential, ownership structures, or lifestyle features?"
        : "Welcome — I'm Sophia, your personal property consultant for luxury real estate in Bohol. Whether you're exploring investment opportunities or searching for the perfect island retreat, I'm here to guide you. What brings you to Island Properties today?";

      const greetingMsg: Message = {
        id: `sophia-${Date.now()}`,
        role: "sophia",
        content: greeting,
        timestamp: new Date(),
      };

      setMessages([greetingMsg]);
      setHasGreeted(true);

      if (isVoiceEnabled) {
        playVoice(greeting);
      }
    }
    // NOTE: playVoice intentionally omitted from deps to prevent infinite greeting loops
    // The function is stable (wrapped in useCallback) and greeting only triggers once per session
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSophiaOpen, hasGreeted, propertyContext, isVoiceEnabled]);

  // Play voice via Polly API
  const playVoice = useCallback(
    async (text: string) => {
      try {
        setSophiaSpeaking(true);

        const response = await fetch("/api/sophia/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, sessionId }),
        });

        if (!response.ok) {
          setSophiaSpeaking(false);
          return;
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setSophiaSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setSophiaSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      } catch {
        setSophiaSpeaking(false);
      }
    },
    [sessionId, setSophiaSpeaking],
  );

  // Stop current audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSophiaSpeaking(false);
    }
  }, [setSophiaSpeaking]);

  // Send message
  const handleSend = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const history = messages.map((m) => ({
          role: m.role === "sophia" ? "assistant" : "user",
          content: m.content,
        }));

        const response = await fetch("/api/sophia/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            history,
            propertyContext,
            sessionId,
          }),
        });

        const data = await response.json();

        const sophiaMsg: Message = {
          id: `sophia-${Date.now()}`,
          role: "sophia",
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, sophiaMsg]);

        if (data.remainingMessages !== undefined) {
          setRemainingMessages(data.remainingMessages);
        }

        if (isVoiceEnabled && !data.rateLimited) {
          playVoice(data.reply);
        }
      } catch {
        const errorMsg: Message = {
          id: `sophia-error-${Date.now()}`,
          role: "sophia",
          content:
            "I appreciate your patience — please try again in a moment, or feel free to use our contact form.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, propertyContext, sessionId, isVoiceEnabled, playVoice],
  );

  if (!isSophiaOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-20 right-4 z-[55] flex h-[520px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-brand-emerald/15 bg-brand-cream shadow-[0_25px_60px_rgba(4,57,39,0.25)] sm:right-6"
      >
        {/* ── Header ──────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-brand-emerald/10 bg-brand-emerald px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/assets/sophia-avatar.png"
                alt="Sophia"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover border-2 border-brand-gold/60"
              />
              {isSophiaSpeaking && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-emerald bg-brand-gold"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-cream">Sophia</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-brand-cream/60">
                Property Consultant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (isSophiaSpeaking) stopAudio();
                setIsVoiceEnabled(!isVoiceEnabled);
              }}
              className="rounded-full p-1.5 text-brand-cream/70 transition hover:bg-white/10 hover:text-brand-cream"
              title={isVoiceEnabled ? "Mute voice" : "Enable voice"}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => {
                stopAudio();
                closeSophia();
              }}
              className="rounded-full p-1.5 text-brand-cream/70 transition hover:bg-white/10 hover:text-brand-cream"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Messages ────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand-emerald text-brand-cream"
                      : "rounded-bl-md border border-brand-emerald/10 bg-white/70 text-brand-emerald shadow-sm"
                  }`}
                >
                  {msg.content}

                  {msg.role === "sophia" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (isSophiaSpeaking) {
                          stopAudio();
                        } else {
                          playVoice(msg.content);
                        }
                      }}
                      className="mt-1.5 flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-brand-gold transition hover:text-brand-emerald"
                    >
                      {isSophiaSpeaking ? (
                        <>
                          <Pause className="h-3 w-3" /> Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3" /> Listen
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md border border-brand-emerald/10 bg-white/70 px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                      className="h-1.5 w-1.5 rounded-full bg-brand-gold"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                      className="h-1.5 w-1.5 rounded-full bg-brand-gold"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                      className="h-1.5 w-1.5 rounded-full bg-brand-gold"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ── Remaining Messages Indicator ─────────────────── */}
        {remainingMessages <= 10 && (
          <div className="px-4 py-1 text-center text-[10px] text-brand-emerald/50">
            {remainingMessages} messages remaining in this session
          </div>
        )}

        {/* ── Input ───────────────────────────────────────── */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 border-t border-brand-emerald/10 bg-white/50 px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sophia anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-brand-emerald placeholder:text-brand-emerald/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-emerald text-brand-cream transition hover:bg-[#05583a] disabled:opacity-40"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
