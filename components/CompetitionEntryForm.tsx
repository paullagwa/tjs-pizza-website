"use client";

import { useRef, useState } from "react";
import { Check, Upload } from "lucide-react";
import { competition } from "@/lib/content/community";

type Status = "idle" | "sending" | "success" | "error";

/** Client-side cap matches the server's 5MB decoded limit */
const MAX_BYTES = 5 * 1024 * 1024;

export default function CompetitionEntryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onFileChange() {
    const file = fileRef.current?.files?.[0];
    setFileError(null);
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileName(null);
      setFileError("Photo is over 5MB — please choose a smaller one.");
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setFileName(file.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setFileError("Please add a photo of the pizza — it's what we judge!");
      return;
    }
    setStatus("sending");
    try {
      const photo = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          kid: data.get("kid"),
          email: data.get("email"),
          note: data.get("note"),
          photo,
          filename: file.name,
          website: data.get("website"), // honeypot
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("success");
      statusRef.current?.focus();
    } catch {
      setStatus("error");
      statusRef.current?.focus();
    }
  }

  return (
    <div className="rounded-lg border border-line bg-bg p-7">
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="outline-none"
      >
        {status === "success" && (
          <div className="py-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-deep">
              <Check aria-hidden="true" className="h-6 w-6 text-white" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold">
              Entry received!
            </h3>
            <p className="mt-2 text-sm text-warm/70">{competition.successMessage}</p>
          </div>
        )}
        {status === "error" && (
          <p className="mb-4 rounded-md border border-red-400/40 bg-red-950/40 p-4 text-sm text-red-200">
            Something went wrong sending your entry. Please try again, or email
            it to{" "}
            <a href={`mailto:${competition.entriesEmail}`} className="font-semibold underline">
              {competition.entriesEmail}
            </a>
            .
          </p>
        )}
      </div>

      {status !== "success" && (
        <form onSubmit={onSubmit} className="space-y-4">
          <h3 className="font-display text-xl font-bold">Enter the challenge</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="comp-name" className="mb-1.5 block text-sm text-warm/80">
                Your name <span aria-hidden="true">*</span>
              </label>
              <input
                id="comp-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
              />
            </div>
            <div>
              <label htmlFor="comp-kid" className="mb-1.5 block text-sm text-warm/80">
                Child&rsquo;s name &amp; age
              </label>
              <input
                id="comp-kid"
                name="kid"
                type="text"
                className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comp-email" className="mb-1.5 block text-sm text-warm/80">
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id="comp-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
            />
          </div>

          <div>
            <label
              htmlFor="comp-photo"
              className="mb-1.5 block text-sm text-warm/80"
            >
              Pizza photo <span aria-hidden="true">*</span>
            </label>
            {/* Keyboard-accessible file input: visually styled label wraps a
                real, focusable (sr-only, not display:none) input */}
            <label
              htmlFor="comp-photo"
              className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-line-strong bg-bg2 px-4 py-4 text-sm text-warm/70 transition-colors hover:border-green has-[:focus-visible]:border-green"
            >
              <Upload aria-hidden="true" className="h-5 w-5 text-green" />
              <span>{fileName ?? "Choose a photo (JPG, PNG or WebP · max 5MB)"}</span>
              <input
                ref={fileRef}
                id="comp-photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={onFileChange}
                className="sr-only"
              />
            </label>
            {fileError && (
              <p role="alert" className="mt-2 text-sm text-red-300">
                {fileError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="comp-note" className="mb-1.5 block text-sm text-warm/80">
              Tell us about the pizza creation (optional)
            </label>
            <textarea
              id="comp-note"
              name="note"
              rows={3}
              className="w-full rounded-md border border-line-strong bg-bg2 px-3.5 py-2.5 text-sm text-warm focus:border-green"
            />
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="comp-website">Website</label>
            <input id="comp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-green-deep px-6 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {status === "sending" ? "Sending entry..." : "Submit entry →"}
          </button>
          <p className="text-center text-xs leading-relaxed text-warm/65">
            {competition.consentNote} See our{" "}
            <a href="/terms" className="underline hover:text-warm">
              competition terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-warm">
              privacy policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
