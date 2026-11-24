import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageContainer } from "@/components/ui/page-container";

// Served with HTTP 404 and `noindex` (Next adds both). The shared header and footer come from the root layout, so
// the way back into the site is always there; the buttons offer the three most useful destinations.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading">
      <PageContainer className="flex min-h-[60vh] flex-col justify-center py-16 md:py-24">
        <Eyebrow>Error 404</Eyebrow>
        <h1 id="not-found-heading" className="type-display-page mt-6 max-w-[720px] text-ink">
          Page not found.
        </h1>
        <p className="type-body-lg mt-8 max-w-[540px] text-ink text-pretty">
          The page you are looking for does not exist or may have moved. Head back to the home page, or go straight to
          one of the pages below.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/" variant="light">
            Back to home
            <span aria-hidden="true">→</span>
          </Button>
          <Button href="/projects" variant="dark">
            Current project
          </Button>
          <Button href="/join" variant="dark">
            Join WATFlight
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
