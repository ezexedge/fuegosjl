import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { homeContent } from "../content";

const icons = {
  shipping: LocalShippingOutlinedIcon,
  payments: PaymentsOutlinedIcon,
  returns: AssignmentReturnOutlinedIcon,
  materials: RestaurantOutlinedIcon,
} as const;

export function PillarsSection() {
  return (
    <Container component="section" sx={{ pb: { xs: 14, md: 20 } }}>
      <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
        {homeContent.pillars.map(({ icon, title, text }) => {
          const Icon = icons[icon];
          return (
            <Box
              key={title}
              sx={{
                p: { xs: 4, md: 6 },
                display: "grid",
                justifyItems: "center",
                gap: 3,
                textAlign: "center",
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "var(--radius-pill)",
                  bgcolor: "background.default",
                  border: 1,
                  borderColor: "divider",
                  color: "primary.main",
                }}
              >
                <Icon />
              </Box>
              <Typography variant="overline" component="h3">
                {title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}
