"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "forno-transcript";
const FALLBACK = "Call Jeff on 0402 091 718 — he will sort you out!";
const GREETING =
  "G'day! I'm Forno, TJ's pizza expert. Ask me about our dough balls, bases, oven temps — anything pizza.";

export default function FornoWidget() {
  const [open, setOpen] = useState(false);
  // Lazy init restores the session transcript on the client; during SSR the
  // panel is closed so the empty initial value never reaches the DOM.
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as Msg[];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  // Persist transcript
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages]);

  // Focus input when opened; Escape closes and returns focus
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        openBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep newest message in view
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy, open]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Server caps at 20 messages — send the most recent window
        body: JSON.stringify({ messages: history.slice(-20) }),
      });
      if (!res.ok) throw new Error("chat failed");
      const data = (await res.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || FALLBACK },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: FALLBACK }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        ref={openBtnRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="forno-panel"
        aria-label={open ? "Close Forno pizza chat" : "Chat with Forno, our pizza expert"}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-deep text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Flame aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      {open && (
        <div
          id="forno-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Forno pizza chat"
          className="fixed bottom-24 right-5 z-40 flex h-[28rem] max-h-[calc(100dvh-8rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-lg border border-line bg-bg2 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-line bg-bg px-4 py-3">
            <div>
              <p className="font-display text-lg font-bold leading-none text-green">
                Forno
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                Pizza expert
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBtnRef.current?.focus();
              }}
              aria-label="Close chat"
              className="flex h-9 w-9 items-center justify-center rounded-md text-warm/70 hover:text-warm"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            <Bubble from="assistant" content={GREETING} />
            {messages.map((m, i) => (
              <Bubble key={i} from={m.role} content={m.content} />
            ))}
            {busy && <Bubble from="assistant" content="…" />}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2 border-t border-line p-3"
          >
            <label htmlFor="forno-input" className="sr-only">
              Ask Forno a question
            </label>
            <input
              id="forno-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  send();
                }
              }}
              maxLength={2000}
              placeholder="Ask about dough, ovens, sizes…"
              className="min-w-0 flex-1 rounded-md border border-line-strong bg-bg px-3 py-2 text-sm text-warm placeholder:text-muted focus:border-green"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-green-deep text-white disabled:opacity-50"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ from, content }: { from: Msg["role"]; content: string }) {
  if (from === "user") {
    return (
      <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-green-deep px-3.5 py-2 text-sm text-white">
        {content}
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-deep font-mono text-[10px] font-bold text-white"
      >
        F
      </span>
      <div className="max-w-[85%] whitespace-pre-wrap rounded-xl rounded-bl-sm bg-warm/5 px-3.5 py-2 text-sm text-warm/90">
        {content}
      </div>
    </div>
  );
}
