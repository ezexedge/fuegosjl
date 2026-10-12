import type { Metadata } from "next";
import { AboutView } from "@/features/about/components/AboutView";

export const metadata: Metadata = { title: "Quiénes somos" };

export default function AboutPage() {
  return <AboutView />;
}
