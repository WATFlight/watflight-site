/**
 * Four decorative corner brackets for a framed picture. They lock in from just outside their corners
 * once, as the frame scrolls into view (motion: app/motion.css). Place it inside a `relative` box that is
 * exactly the picture's size. aria-hidden, no pointer events.
 */
const arm = "pointer-events-none absolute size-4 border-ink/45 md:size-5";

export function FrameBrackets() {
  return (
    <>
      <span aria-hidden="true" data-bracket="tl" data-reveal="bracket" className={`${arm} top-3 left-3 border-t-[1.5px] border-l-[1.5px]`} />
      <span aria-hidden="true" data-bracket="tr" data-reveal="bracket" className={`${arm} top-3 right-3 border-t-[1.5px] border-r-[1.5px]`} />
      <span aria-hidden="true" data-bracket="bl" data-reveal="bracket" className={`${arm} bottom-3 left-3 border-b-[1.5px] border-l-[1.5px]`} />
      <span aria-hidden="true" data-bracket="br" data-reveal="bracket" className={`${arm} right-3 bottom-3 border-r-[1.5px] border-b-[1.5px]`} />
    </>
  );
}
