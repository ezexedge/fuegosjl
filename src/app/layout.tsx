import type { Metadata } from "next";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { fontClassNames } from "@/theme/fonts";
import { ThemeRegistry } from "@/theme/ThemeRegistry";

export const metadata: Metadata = {
  title: "Parrilla",
  description: "Ecommerce",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={fontClassNames} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          attribute="data-mui-color-scheme"
          defaultMode="light"
        />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
