/**
 * Inline boot script, rendered in <head> so it runs before the first paint.
 *
 * It arms the scroll-reveal system (`<html data-motion="armed">`) only when the visitor allows motion,
 * which is the only way anything in app/motion.css can be hidden. If the page's JavaScript has not
 * taken over (data-motion still "armed") after 4 seconds, it removes the attribute and every hidden
 * element is shown, so a failed or very slow bundle can never leave content invisible. Without
 * JavaScript the attribute is never set and nothing is ever hidden. The controller treats a missing
 * attribute as "off" and never re-arms. It also records the first wheel, key, touch or pointer press that
 * happens before the bundle has loaded (`window.__heroIntent`), so the Home hero's long opening can be
 * fast-forwarded at once when the controller starts.
 */
const bootScript = `(function(d){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.setAttribute("data-motion","armed");var m=function(){window.__heroIntent=1};["wheel","keydown","touchstart","pointerdown"].forEach(function(e){addEventListener(e,m,{once:true,passive:true,capture:true})});setTimeout(function(){if(d.getAttribute("data-motion")==="armed")d.removeAttribute("data-motion")},4000)}catch(e){}})(document.documentElement)`;

export function MotionBoot() {
  return <script dangerouslySetInnerHTML={{ __html: bootScript }} />;
}
