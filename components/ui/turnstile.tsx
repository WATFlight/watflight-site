"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      size: "flexible" | "compact";
      theme: "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileProps = {
  action: "sponsorship" | "join";
  resetSignal: number;
  onTokenChange: (token: string) => void;
};

export function Turnstile({ action, resetSignal, onTokenChange }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenChangeRef = useRef(onTokenChange);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SITE_KEY : "");

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (!ready || !siteKey || !containerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      size: window.matchMedia("(max-width: 339px)").matches ? "compact" : "flexible",
      theme: "dark",
      callback: (token) => onTokenChangeRef.current(token),
      "expired-callback": () => onTokenChangeRef.current(""),
      "error-callback": () => onTokenChangeRef.current(""),
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [action, ready, siteKey]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChangeRef.current("");
    }
  }, [resetSignal]);

  return (
    <div className="max-w-[300px]">
      <Script
        id="cloudflare-turnstile"
        src={TURNSTILE_SCRIPT}
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={() => setLoadFailed(true)}
      />
      <p className="type-eyebrow mb-2.5 font-semibold text-ink">Spam protection</p>
      {siteKey && !loadFailed ? (
        <div ref={containerRef} className="min-h-[65px] w-full" />
      ) : (
        <p role="alert" className="type-body-sm text-ink">
          Spam protection is unavailable. Please try again later.
        </p>
      )}
    </div>
  );
}
