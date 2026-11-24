"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { subscribeToScroll, type ScrollSnapshot } from "@/lib/scroll-store";

/**
 * The one client component behind the motion system (see app/motion.css for the concept and the
 * data-attribute vocabulary). It renders nothing. It owns:
 *
 *  - smooth wheel scrolling (Lenis, loaded on demand; touch, keyboard and the scrollbar stay native)
 *    and the in-page anchor jumps that use it;
 *  - ONE IntersectionObserver for every `[data-reveal]` (each element plays once, siblings that enter
 *    in the same frame are staggered);
 *  - one observer that stops the sponsor marquee while it is off screen;
 *  - ONE shared scroll subscription (lib/scroll-store.ts) for the scroll-linked pieces: connector
 *    progress (`[data-progress]`) and the slow image push (`[data-parallax]`). Only elements that are
 *    in view are updated.
 *
 * It never changes the DOM structure, display, visibility or tab order: it sets data attributes and
 * CSS custom properties. Everything is torn down on route change and unmount. With reduced motion
 * nothing here starts (the page is shown in its finished state by app/motion.css).
 */

/** Largest stagger step (times --stagger) for items revealed in the same frame. */
const MAX_STAGGER_STEPS = 5;
/** Smoothing of the wheel: the portfolio's feel, light rather than heavy. */
const WHEEL_LERP = 0.16;
/** How fast the Home hero's opening runs once the visitor interacts (it fast-forwards rather than cutting). */
const HERO_FAST_RATE = 9;
/** After this long the opening is over; stop listening for interruptions. */
const HERO_INTRO_MAX_MS = 7000;
/** Scroll distance over which the Home hero's hand-off line draws. */
const HERO_HANDOFF_PX = 320;
/** Where the "reading line" sits (share of the viewport height) for connector progress. */
const READING_LINE = 0.62;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const noop = () => {};

/* -------------------------------------------------------------------------------------------------
   Reveals
   ------------------------------------------------------------------------------------------------- */

function observeReveals(): () => void {
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-inview])"));
  if (targets.length === 0) return noop;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.setAttribute("data-inview", ""));
    return noop;
  }

  const pending = new Set(targets);
  const play = (element: HTMLElement, index: number) => {
    element.style.setProperty("--i", String(Math.min(index, MAX_STAGGER_STEPS)));
    element.setAttribute("data-inview", "");
    pending.delete(element);
    observer.unobserve(element);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entry, index) => play(entry.target as HTMLElement, index));
    },
    { rootMargin: "0px 0px -48px 0px", threshold: 0 },
  );
  targets.forEach((target) => observer.observe(target));

  // The observer's bottom margin means anything in the last 48px of the viewport (the footer's closing rule)
  // can never be reached once the page can not scroll further. At the end of the page, play what is on screen.
  const unsubscribe = subscribeToScroll((snapshot) => {
    if (pending.size === 0 || snapshot.maxScroll - snapshot.scrollY > 4) return;
    Array.from(pending)
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return box.top < snapshot.viewportHeight && box.bottom > 0;
      })
      .forEach((element, index) => play(element, index));
  });

  return () => {
    unsubscribe();
    observer.disconnect();
  };
}

/* -------------------------------------------------------------------------------------------------
   The Home hero's opening: never hold the visitor captive
   ------------------------------------------------------------------------------------------------- */

/**
 * The hero's opening is pure CSS (it starts on first paint, with no JavaScript). The first time the visitor
 * scrolls, presses a key (Tab included), touches, clicks, or focuses something in the hero, every running
 * hero animation (and the grid rails) is fast-forwarded through the Web Animations API, so it settles in a
 * fraction of a second instead of being cut or left to finish. An intent that happened before this ran was
 * recorded by the boot script (`window.__heroIntent`).
 */
function heroIntroInterrupt(): () => void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return noop;
  let done = false;

  const accelerate = () => {
    if (done) return;
    done = true;
    cleanup();
    document.getAnimations().forEach((animation) => {
      const target = (animation.effect as KeyframeEffect | null)?.target;
      if (!(target instanceof Element)) return;
      if (hero.contains(target) || target.closest("[data-rail]")) {
        if (animation.playState === "running") animation.playbackRate = HERO_FAST_RATE;
      }
    });
  };
  const onScroll = () => {
    if (window.scrollY > 4) accelerate();
  };
  const events: Array<[EventTarget, string]> = [
    [window, "wheel"],
    [window, "touchstart"],
    [window, "keydown"],
    [window, "pointerdown"],
    [hero, "focusin"],
  ];
  events.forEach(([target, type]) => target.addEventListener(type, accelerate, { capture: true, passive: true }));
  window.addEventListener("scroll", onScroll, { passive: true });
  const timer = window.setTimeout(() => cleanup(), HERO_INTRO_MAX_MS);

  function cleanup() {
    events.forEach(([target, type]) => target.removeEventListener(type, accelerate, true));
    window.removeEventListener("scroll", onScroll);
    window.clearTimeout(timer);
  }

  if ((window as Window & { __heroIntent?: number }).__heroIntent) accelerate();
  return cleanup;
}

/* -------------------------------------------------------------------------------------------------
   Loops that must not run off screen
   ------------------------------------------------------------------------------------------------- */

function observeLoops(): () => void {
  const loops = Array.from(document.querySelectorAll<HTMLElement>(".sponsor-marquee"));
  if (loops.length === 0 || !("IntersectionObserver" in window)) return noop;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) element.removeAttribute("data-offscreen");
        else element.setAttribute("data-offscreen", "");
      });
    },
    { rootMargin: "120px 0px" },
  );

  loops.forEach((loop) => observer.observe(loop));
  return () => {
    observer.disconnect();
    loops.forEach((loop) => loop.removeAttribute("data-offscreen"));
  };
}

/* -------------------------------------------------------------------------------------------------
   Scroll-linked: connector progress and image push
   ------------------------------------------------------------------------------------------------- */

type Step = { element: HTMLElement; at: number };

type Track = {
  element: HTMLElement;
  steps: Step[];
  measured: boolean;
  /** Highest progress reached so far: a connector draws once and never retracts. */
  reached: number;
  visible: boolean;
  done: boolean;
};

type Frame = { element: HTMLElement; mode: string; visible: boolean };

function measureTrack(track: Track) {
  const box = track.element.getBoundingClientRect();
  const nodes = Array.from(track.element.querySelectorAll<HTMLElement>("[data-at]"));
  const rects = nodes.map((node) => node.getBoundingClientRect());
  // Steps that are not laid out at this width (display: none) have no box and are skipped.
  const laidOut = nodes.map((node, index) => ({ node, rect: rects[index] })).filter(({ rect }) => rect.width > 0 || rect.height > 0);
  track.measured = true;
  track.steps = [];
  if (laidOut.length === 0 || box.width === 0 || box.height === 0) return;

  const horizontal =
    laidOut.length > 1
      ? Math.abs(laidOut[1].rect.left - laidOut[0].rect.left) > Math.abs(laidOut[1].rect.top - laidOut[0].rect.top)
      : box.width > box.height;

  track.steps = laidOut.map(({ node, rect }) => ({
    element: node,
    at: horizontal
      ? (rect.left - box.left + Math.min(rect.width / 2, 24)) / box.width
      : (rect.top - box.top + 14) / box.height,
  }));
}

function trackScrollLinked(): () => void {
  const tracks: Track[] = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]")).map((element) => ({
    element,
    steps: [],
    measured: false,
    reached: 0,
    visible: false,
    done: false,
  }));
  const frames: Frame[] = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((element) => ({
    element,
    mode: element.dataset.parallax ?? "settle",
    visible: false,
  }));
  // Home hero hand-off: --hp (0 to 1 over the first HERO_HANDOFF_PX of scroll) draws the line that runs from the
  // hero down into the rule that closes it. Written on the shared scroll subscription, only while it can change.
  const heroes = Array.from(document.querySelectorAll<HTMLElement>("[data-hero]")).map((element) => ({ element, last: -1 }));
  if (tracks.length === 0 && frames.length === 0 && heroes.length === 0) return noop;

  let first = true;
  let latest: ScrollSnapshot | null = null;

  const markReached = (track: Track) => {
    track.steps.forEach((step) => {
      if (track.reached >= step.at && !step.element.hasAttribute("data-reached")) {
        step.element.setAttribute("data-reached", "");
      }
    });
  };

  const update = (snapshot: ScrollSnapshot) => {
    latest = snapshot;
    const vh = snapshot.viewportHeight;

    for (const track of tracks) {
      if (track.done || !(first || track.visible)) continue;
      if (!track.measured) measureTrack(track);
      const box = track.element.getBoundingClientRect();
      if (box.height === 0) continue;
      const progress = clamp((vh * READING_LINE - box.top) / box.height);
      if (progress > track.reached) {
        track.reached = progress >= 0.995 ? 1 : progress;
        track.element.style.setProperty("--p", track.reached.toFixed(4));
      }
      markReached(track);
      if (track.reached >= 1) track.done = true;
    }

    for (const hero of heroes) {
      const value = Math.round(clamp(snapshot.scrollY / HERO_HANDOFF_PX) * 1000) / 1000;
      if (value === hero.last) continue;
      hero.last = value;
      hero.element.style.setProperty("--hp", String(value));
    }

    for (const frame of frames) {
      if (!(first || frame.visible)) continue;
      const box = frame.element.getBoundingClientRect();
      if (box.height === 0) continue;
      const t =
        frame.mode === "push"
          ? clamp(snapshot.scrollY / (box.height * 0.9))
          : clamp((box.top + box.height / 2 - vh * 0.5) / (vh * 0.5 + box.height / 2));
      frame.element.style.setProperty("--pp", t.toFixed(3));
      // Only transform the picture while it is displaced from its designed crop.
      if (t > 0.001) frame.element.setAttribute("data-pp", "");
      else frame.element.removeAttribute("data-pp");
    }
    first = false;
  };

  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const element = entry.target as HTMLElement;
              const visible = entry.isIntersecting;
              const track = tracks.find((candidate) => candidate.element === element);
              if (track) track.visible = visible;
              const frame = frames.find((candidate) => candidate.element === element);
              if (frame) {
                frame.visible = visible;
                // Off screen: drop the transform and its compositing layer.
                if (!visible) element.removeAttribute("data-pp");
              }
            });
            if (latest) update(latest);
          },
          { rootMargin: "80px 0px" },
        )
      : null;
  tracks.forEach((track) => observer?.observe(track.element));
  frames.forEach((frame) => observer?.observe(frame.element));

  // Layout changes (resize, fonts, images) move the steps: measure again, and keep finished tracks finished.
  const resizeObserver =
    "ResizeObserver" in window
      ? new ResizeObserver(() => {
          tracks.forEach((track) => {
            track.measured = false;
            if (track.done) {
              measureTrack(track);
              markReached(track);
            }
          });
          if (latest) update(latest);
        })
      : null;
  tracks.forEach((track) => resizeObserver?.observe(track.element));

  const unsubscribe = subscribeToScroll(update);

  return () => {
    unsubscribe();
    observer?.disconnect();
    resizeObserver?.disconnect();
    heroes.forEach((hero) => hero.element.style.removeProperty("--hp"));
    frames.forEach((frame) => {
      frame.element.removeAttribute("data-pp");
      frame.element.style.removeProperty("--pp");
    });
  };
}

/* -------------------------------------------------------------------------------------------------
   Smooth scrolling and in-page anchors
   ------------------------------------------------------------------------------------------------- */

/** Gives a jump target keyboard focus without scrolling or a ring, so the next Tab continues from there. */
function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.setAttribute("data-motion-focus", "");
  target.focus({ preventScroll: true });
}

export function MotionController() {
  const pathname = usePathname();

  /* Smooth scrolling, anchors and page visibility: once per page load. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let loading = false;
    let disposed = false;
    let frame = 0;
    let running = false;

    // Lenis is driven on demand instead of by a permanent animation-frame loop: the loop wakes on the
    // first wheel event (or an anchor jump) and sleeps again once the smoothing has settled.
    const tick = (time: number) => {
      if (!lenis) {
        running = false;
        return;
      }
      lenis.raf(time);
      if (lenis.isScrolling === "smooth") {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };
    const wake = () => {
      if (!lenis || running) return;
      running = true;
      lenis.raf(performance.now()); // reset its clock so the first step after idle is a normal step
      frame = requestAnimationFrame(tick);
    };

    const start = async () => {
      if (lenis || loading || reduce.matches) return;
      loading = true;
      const { default: LenisClass } = await import("lenis");
      loading = false;
      if (disposed || lenis || reduce.matches) return;
      lenis = new LenisClass({
        lerp: WHEEL_LERP,
        smoothWheel: true,
        autoRaf: false,
        // Nested scrollers and text fields keep their native wheel behaviour.
        prevent: (node) => node.matches("textarea, select, [data-lenis-prevent]") || node.closest("dialog[open]") !== null,
      });
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      running = false;
      lenis?.destroy();
      lenis = null;
    };

    const onReduceChange = () => {
      if (reduce.matches) stop();
      else void start();
    };

    // In-page links (#how-to-apply and friends). Handled here so the jump is one controlled glide that
    // lands below the sticky header (Lenis reads the target's scroll-margin-top), the URL and Back
    // button behave like a normal anchor, and focus moves to the section so Tab continues from it.
    // Without Lenis (reduced motion, or before it has loaded) the jump is instant.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      // Arriving by in-app navigation plays shorter entrances (the Home hero's full startup is for a fresh
      // load); the marker is set before the next page mounts.
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
        document.documentElement.setAttribute("data-nav", "soft");
      }
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      if (!url.hash || url.hash === "#") return;
      let id = url.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* keep the raw id */
      }
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      event.stopPropagation(); // keeps next/link from also jumping

      if (url.hash !== window.location.hash) window.history.pushState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);

      if (lenis) {
        const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
        const distance = Math.abs(target.getBoundingClientRect().top - margin);
        wake();
        lenis.scrollTo(target, { duration: clamp(distance / 2200, 0.7, 1.5), easing: easeInOutCubic });
      } else {
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }
      focusTarget(target);
    };

    const onVisibility = () => {
      if (document.hidden) document.documentElement.setAttribute("data-page-hidden", "");
      else document.documentElement.removeAttribute("data-page-hidden");
    };

    const onPopState = () => document.documentElement.setAttribute("data-nav", "soft");

    window.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("wheel", wake, { capture: true, passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onReduceChange);
    void start();

    return () => {
      disposed = true;
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("wheel", wake, true);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduceChange);
      document.documentElement.removeAttribute("data-page-hidden");
      stop();
    };
  }, []);

  /* Reveals, loops and scroll-linked pieces: rebuilt for every page. */
  useEffect(() => {
    const html = document.documentElement;
    const state = html.getAttribute("data-motion");
    // The hero's CSS opening runs without the boot script, so its interruption does too (not with reduced motion).
    const stopIntro = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? noop : heroIntroInterrupt();
    // Not armed: reduced motion, no boot script, or the 4 s failsafe already showed everything.
    if (state !== "armed" && state !== "live") return stopIntro;
    html.setAttribute("data-motion", "live");

    const cleanups = [stopIntro, observeReveals(), observeLoops(), trackScrollLinked()];
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
