import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { AppLink } from "./AppLink";

export interface Crumb {
  label: string;
  href?: string;
}

export function PageBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumbs aria-label="Migas de pan" separator="›" sx={{ typography: "caption", color: "text.secondary" }}>
      {items.map((item) =>
        item.href ? (
          <AppLink key={item.label} href={item.href} variant="caption" color="inherit" underline="hover">
            {item.label}
          </AppLink>
        ) : (
          <Typography key={item.label} variant="caption" color="text.primary" aria-current="page">
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
