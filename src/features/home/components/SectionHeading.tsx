import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionHeadingProps {
  overline: string;
  title: string;
  align?: "center" | "left";
  rule?: boolean;
}

export function SectionHeading({ overline, title, align = "center", rule = true }: SectionHeadingProps) {
  return (
    <Box sx={{ textAlign: align, mb: 10 }}>
      <Typography variant="overline" component="span" sx={{ color: "primary.main", display: "block", mb: 2 }}>
        {overline}
      </Typography>
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      {rule ? (
        <Box
          sx={{
            width: 64,
            height: "1.5px",
            bgcolor: "primary.main",
            mt: 4,
            mx: align === "center" ? "auto" : 0,
          }}
        />
      ) : null}
    </Box>
  );
}
