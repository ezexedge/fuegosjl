"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { config } from "@/lib/config";
import { formatPrice, installmentValue, transferPrice } from "@/lib/format";
import { parseAttributeOptions } from "@/lib/utils";
import type { ProductWithRelations } from "../types";

type PurchaseProduct = Pick<ProductWithRelations, "price" | "compareAtPrice" | "stock" | "attributes">;

export function ProductPurchase({ product }: { product: PurchaseProduct }) {
  const optionGroups = Object.entries(product.attributes)
    .map(([label, value]) => ({ label, options: parseAttributeOptions(value) }))
    .filter((g) => g.options.length > 1);

  const [selection, setSelection] = useState<Record<string, string>>(() =>
    Object.fromEntries(optionGroups.map((g) => [g.label, g.options[0]])),
  );
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<ToastState | null>(null);
  const inStock = product.stock > 0;

  return (
    <Box sx={{ display: "grid", gap: 5 }}>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="priceFeatured" component="p">
          {formatPrice(product.price)}
        </Typography>
        {product.compareAtPrice ? (
          <Typography variant="caption" color="text.secondary" component="p" sx={{ textDecoration: "line-through" }}>
            {formatPrice(product.compareAtPrice)}
          </Typography>
        ) : null}
        <Typography variant="body2" component="p" sx={{ color: "accent.main", fontWeight: 600 }}>
          {formatPrice(transferPrice(product.price))} con Transferencia o depósito bancario
        </Typography>
        <Typography variant="caption" component="p" sx={{ color: "accent.main" }}>
          {config.installments} cuotas sin interés de {formatPrice(installmentValue(product.price))}
        </Typography>
        <Typography variant="caption" component="p" color="text.secondary">
          <Typography component="span" variant="caption" sx={{ color: "accent.main" }}>
            {config.transferDiscountPercent}% de descuento
          </Typography>{" "}
          pagando con Transferencia o depósito bancario
        </Typography>
      </Box>

      {optionGroups.map((group) => (
        <Box key={group.label} role="radiogroup" aria-label={group.label} sx={{ display: "grid", gap: 2 }}>
          <Typography variant="body2">
            {group.label}:{" "}
            <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
              {selection[group.label]}
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {group.options.map((option) => {
              const active = selection[group.label] === option;
              return (
                <Button
                  key={option}
                  role="radio"
                  aria-checked={active}
                  variant={active ? "contained" : "outlined"}
                  color="secondary"
                  size="small"
                  onClick={() => setSelection((s) => ({ ...s, [group.label]: option }))}
                  sx={{ px: 4, py: 2, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}
                >
                  {option}
                </Button>
              );
            })}
          </Box>
        </Box>
      ))}

      {product.stock === 1 ? (
        <Typography variant="body2" sx={{ color: "accent.main", fontWeight: 600 }}>
          ¡No te lo pierdas, es el último!
        </Typography>
      ) : null}

      <Box sx={{ display: "flex", gap: 3, alignItems: "stretch" }}>
        <Box sx={{ display: "flex", alignItems: "center", border: 1, borderColor: "divider", borderRadius: 1 }}>
          <IconButton
            aria-label="Restar una unidad"
            size="small"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography aria-live="polite" sx={{ minWidth: 32, textAlign: "center" }}>
            {quantity}
          </Typography>
          <IconButton
            aria-label="Sumar una unidad"
            size="small"
            disabled={quantity >= product.stock}
            onClick={() => setQuantity((q) => q + 1)}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!inStock}
          startIcon={<ShoppingBagOutlinedIcon />}
          onClick={() =>
            setToast({ severity: "success", message: "El carrito estará disponible próximamente." })
          }
        >
          {inStock ? "Agregar al carrito" : "Sin stock"}
        </Button>
      </Box>
      <Typography variant="caption" color="text.secondary">
        {inStock ? `${product.stock} en stock` : "Sin stock"}
      </Typography>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </Box>
  );
}
