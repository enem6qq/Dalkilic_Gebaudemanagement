"use client";

import { useEffect, useState } from "react";
import { ContactForm } from "./ContactForm";

export function ContactTabs() {
  const [mode, setMode] = useState<"anfrage" | "rueckruf">("anfrage");
  useEffect(() => {
    if (window.location.hash === "#rueckruf") setMode("rueckruf");
  }, []);
  return (
    <div>
      <div className="mb-5 inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10" role="tablist">
        {(
          [
            ["anfrage", "Anfrage senden"],
            ["rueckruf", "Rückruf anfordern"],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full px-5 py-2.5 text-[14px] font-bold transition-colors ${mode === m ? "bg-navy text-white" : "text-mist hover:text-navy"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <ContactForm key={mode} mode={mode} />
    </div>
  );
}
