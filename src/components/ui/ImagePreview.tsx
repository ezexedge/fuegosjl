"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface ImagePreviewProps {
  url: string;
  alt: string;
  size?: number;
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\/\S+$/i.test(value);
}

/** Vista previa de una imagen por URL. Con `key={url}` se reinicia el estado de error. */
export function ImagePreview({ url, alt, size = 80 }: ImagePreviewProps) {
  const [failed, setFailed] = useState(false);
  const valid = isHttpUrl(url) && !failed;
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      {valid ? (
        <Image
          key={url}
          src={url}
          alt={alt}
          fill
          sizes={`${size}px`}
          unoptimized
          style={{ objectFit: "cover" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <Typography variant="caption" color="text.secondary" align="center">
          {url ? "No se pudo cargar" : "Sin imagen"}
        </Typography>
      )}
    </Box>
  );
}
