import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LinkIconButton } from "@/components/ui/LinkIconButton";

interface ProductsPaginationProps {
  page: number;
  totalPages: number;
  /** Devuelve la URL de una página manteniendo los filtros activos. */
  hrefFor: (page: number) => string;
}

export function ProductsPagination({ page, totalPages, hrefFor }: ProductsPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <Box component="nav" aria-label="Paginación" sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, mt: 12 }}>
      <LinkIconButton aria-label="Página anterior" href={page > 1 ? hrefFor(page - 1) : undefined}>
        <ChevronLeftIcon />
      </LinkIconButton>
      <Typography variant="body2">
        {page} / {totalPages}
      </Typography>
      <LinkIconButton aria-label="Página siguiente" href={page < totalPages ? hrefFor(page + 1) : undefined}>
        <ChevronRightIcon />
      </LinkIconButton>
    </Box>
  );
}
