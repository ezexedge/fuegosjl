"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { RemoteImage } from "@/components/ui/RemoteImage";
import type { ProductImage } from "@/db/schema";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {images.length > 1 ? (
        <Box
          role="tablist"
          aria-label="Miniaturas"
          sx={{
            order: { xs: 2, md: 0 },
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: { xs: "center", md: "flex-start" },
            gap: 2,
            flexShrink: 0,
            maxHeight: { md: 520 },
            overflow: "auto",
          }}
        >
          {images.map((image, index) => (
            <ButtonBase
              key={image.id}
              role="tab"
              aria-selected={index === selected}
              aria-label={`Ver imagen ${index + 1}`}
              onClick={() => setSelected(index)}
              sx={{
                position: "relative",
                width: { xs: 56, md: 80 },
                height: { xs: 56, md: 80 },
                flexShrink: 0,
                border: 1,
                borderColor: index === selected ? "text.primary" : "divider",
                borderRadius: 1,
                overflow: "hidden",
                "&:focus-visible": { outline: 2, outlineStyle: "solid", outlineOffset: 2 },
              }}
            >
              <RemoteImage src={image.url} alt={image.alt ?? `${name} ${index + 1}`} fill sizes="80px" style={{ objectFit: "cover" }} />
            </ButtonBase>
          ))}
        </Box>
      ) : null}

      <Box sx={{ position: "relative", flex: 1, aspectRatio: "4 / 3", minHeight: 240 }}>
        {current ? (
          <RemoteImage
            src={current.url}
            alt={current.alt ?? name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </Box>
    </Box>
  );
}
