import type { Metadata } from "next";
import { ContactView } from "@/features/contact/components/ContactView";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactPage() {
  return <ContactView />;
}
