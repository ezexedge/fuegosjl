import type { ReactNode } from "react";
import { ShopShell } from "@/components/layout/ShopShell";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <ShopShell footer="columns">{children}</ShopShell>;
}
