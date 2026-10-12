import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { homeContent } from "../content";

const icons = {
  shipping: LocalShippingOutlinedIcon,
  discount: PercentIcon,
  card: CreditCardOutlinedIcon,
  verified: VerifiedOutlinedIcon,
} as const;

export function TrustStrip() {
  return (
    <Box sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider", py: 3 }}>
      <Container
        sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}
      >
        {homeContent.trustStrip.map(({ icon, label }) => {
          const Icon = icons[icon];
          return (
            <Box key={label} sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
              <Icon fontSize="small" sx={{ color: "primary.main" }} />
              <Typography variant="overline" component="span">
                {label}
              </Typography>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
