"use client";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageContainer } from "@/components/ui/page-container";

// Shown inside the shared header and footer if a page throws while it renders. It deliberately shows and logs
// nothing from the error itself (messages can carry details), only a way to retry or leave.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section aria-labelledby="error-heading">
      <PageContainer className="flex min-h-[60vh] flex-col justify-center py-16 md:py-24">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 id="error-heading" className="type-display-page mt-6 max-w-[720px] text-ink">
          This page did not load.
        </h1>
        <p className="type-body-lg mt-8 max-w-[540px] text-ink text-pretty">
          An unexpected error stopped this page from loading. Try again, or head back to the home page.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button variant="light" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="dark">
            Back to home
          </Button>
        </div>
      </PageContainer>
    </section>
  );
}
