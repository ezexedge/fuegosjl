import type { ThemeOptions } from "@mui/material/styles";
import { fontFamily, typography as t } from "./tokens";

const heading = { fontFamily: fontFamily.heading };

export const typography: ThemeOptions["typography"] = {
  fontFamily: fontFamily.body,
  h1: {
    ...heading,
    ...t.h1,
    [t.mobileMediaQuery]: t.h1Mobile,
  },
  h2: {
    ...heading,
    ...t.h2,
    [t.mobileMediaQuery]: t.h2Mobile,
  },
  h3: { ...heading, ...t.h3 },
  h4: { ...heading, ...t.h4 },
  h5: { ...t.h5, textTransform: "uppercase" },
  h6: { ...t.h5 },
  body1: t.body1,
  body2: t.body2,
  caption: t.caption,
  overline: { ...t.overline, textTransform: "uppercase" },
  button: { ...t.button, textTransform: "uppercase" },
  price: t.price,
  priceFeatured: t.priceFeatured,
};
