export interface ScrollSnapshot {
  scrollY: number;
  viewportHeight: number;
  maxScroll: number;
}

type ScrollListener = (snapshot: ScrollSnapshot) => void;

const listeners = new Set<ScrollListener>();
let snapshot: ScrollSnapshot = { scrollY: 0, viewportHeight: 0, maxScroll: 0 };
let animationFrame: number | null = null;
let isListening = false;

function readSnapshot(): ScrollSnapshot {
  const viewportHeight = window.innerHeight;
  return {
    scrollY: window.scrollY,
    viewportHeight,
    maxScroll: Math.max(0, document.documentElement.scrollHeight - viewportHeight),
  };
}

function publish() {
  animationFrame = null;
  snapshot = readSnapshot();
  listeners.forEach((listener) => listener(snapshot));
}

function schedulePublish() {
  if (animationFrame === null) {
    animationFrame = window.requestAnimationFrame(publish);
  }
}

function start() {
  if (isListening) return;
  isListening = true;
  window.addEventListener("scroll", schedulePublish, { passive: true });
  window.addEventListener("resize", schedulePublish, { passive: true });
  publish();
}

function stop() {
  if (!isListening) return;
  isListening = false;
  window.removeEventListener("scroll", schedulePublish);
  window.removeEventListener("resize", schedulePublish);
  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

export function subscribeToScroll(listener: ScrollListener) {
  const wasListening = isListening;
  listeners.add(listener);
  if (wasListening) {
    listener(snapshot);
  } else {
    start();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) stop();
  };
}
