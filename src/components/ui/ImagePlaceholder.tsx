import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Box from "@mui/material/Box";

/** Relleno para productos o categorías que todavía no tienen imagen. */
export function ImagePlaceholder({ label = "Sin imagen" }: { label?: string }) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
        opacity: 0.5,
      }}
    >
      <ImageOutlinedIcon fontSize="large" />
    </Box>
  );
}
