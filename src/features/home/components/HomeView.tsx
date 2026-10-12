import { Suspense } from "react";
import { CategoriesSection } from "./CategoriesSection";
import { FeaturedSection } from "./FeaturedSection";
import { HistorySection } from "./HistorySection";
import { HomeDataSkeleton } from "./HomeDataSkeleton";
import { Hero } from "./Hero";
import { NewsletterSection } from "./NewsletterSection";
import { PillarsSection } from "./PillarsSection";
import { QatarSection } from "./QatarSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { TrustStrip } from "./TrustStrip";

export function HomeView() {
  return (
    <>
      <TrustStrip />
      <Hero />
      <Suspense fallback={<HomeDataSkeleton />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<HomeDataSkeleton height={360} />}>
        <FeaturedSection />
      </Suspense>
      <QatarSection />
      <PillarsSection />
      <HistorySection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
