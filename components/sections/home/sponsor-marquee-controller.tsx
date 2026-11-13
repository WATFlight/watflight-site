"use client";

import { useEffect } from "react";

/** Longest the motion waits for the images before starting anyway (the track geometry does not depend on them). */
const MAX_WAIT_MS = 3000;
/** Frames to wait for the track width to stop changing before the motion starts. */
const MAX_STABLE_FRAMES = 30;

const delay = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const frame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));

/** Resolves true once the image has loaded and decoded, false if it failed. Handles images that finished before hydration. */
function whenSettled(img: HTMLImageElement | null): Promise<boolean> {
  return new Promise((resolve) => {
    if (!img) return resolve(false);
    const decoded = () => {
      if (img.naturalWidth === 0) return resolve(false);
      (img.decode ? img.decode() : Promise.resolve()).then(
        () => resolve(true),
        () => resolve(true),
      );
    };
    if (img.complete) return decoded();
    img.addEventListener("load", decoded, { once: true });
    img.addEventListener("error", () => resolve(false), { once: true });
  });
}

async function waitForStableWidth(track: HTMLElement) {
  let last = track.getBoundingClientRect().width;
  for (let i = 0; i < MAX_STABLE_FRAMES; i += 1) {
    await frame();
    const width = track.getBoundingClientRect().width;
    if (width === last) return;
    last = width;
  }
}

/** Resolves once the page has fully loaded (hero image included), so the logos never compete with it. */
function pageLoaded(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

/**
 * The only client code in the sponsor marquee. The server-rendered markup already shows every
 * organization (a text wordmark in each logo's reserved slot); this reports readiness and starts
 * the motion, touching nothing but two data attributes and each logo's `loading` attribute, so
 * React never re-renders the row:
 *  - `loading="eager"` on every logo (the HTML ships them `lazy`) once the page's load event has
 *    fired, so every unique file starts downloading, at low priority, behind the hero image.
 *  - `data-state="ready" | "error"` on each `[data-logo-slot]` once its image has loaded and decoded
 *    (or failed). CSS then swaps the text for the logo in place, or keeps the text for good.
 *  - `data-motion="running"` on the marquee root once fonts are ready, the images have settled (or
 *    MAX_WAIT_MS has passed since they started loading) and the track's width has stopped changing,
 *    so the loop never starts on geometry that is still moving.
 */
export function SponsorMarqueeController({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    const track = root?.querySelector<HTMLElement>(".sponsor-marquee__track");
    if (!root || !track) return;
    let cancelled = false;

    const slots = Array.from(root.querySelectorAll<HTMLElement>("[data-logo-slot]"));
    const settled = slots.map(async (slot) => {
      const ok = await whenSettled(slot.querySelector("img"));
      if (!cancelled) slot.dataset.state = ok ? "ready" : "error";
    });

    // Start every download once the page itself is done (the browser has already started any logo
    // that was scrolled into view before that).
    const loading = pageLoaded().then(() => {
      if (!cancelled) root.querySelectorAll("img").forEach((img) => (img.loading = "eager"));
    });

    const fonts = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
    const imagesOrCap = Promise.race([Promise.all(settled), loading.then(() => delay(MAX_WAIT_MS))]);
    Promise.all([fonts, imagesOrCap])
      .then(() => waitForStableWidth(track))
      .then(() => {
        if (!cancelled) root.dataset.motion = "running";
      });

    return () => {
      cancelled = true;
    };
  }, [rootId]);

  return null;
}
