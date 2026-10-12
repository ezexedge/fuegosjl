"use client";

import { useEffect } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { centsToPesos, slugify } from "@/lib/utils";
import { productFormSchema, type ProductFormValues } from "../schemas";
import type { ProductWithRelations } from "../types";
import type { CategoryOption } from "../hooks/useProductsAdmin";

interface ProductFormDialogProps {
  open: boolean;
  product: ProductWithRelations | null;
  categories: CategoryOption[];
  saving: boolean;
  onSubmit: (values: ProductFormValues) => void;
  onClose: () => void;
}

const emptyValues: ProductFormValues = {
  categoryId: 0,
  name: "",
  slug: "",
  description: "",
  price: 0,
  compareAtPrice: null,
  sku: "",
  stock: 0,
  badge: "",
  isActive: true,
  isFeatured: false,
  images: [],
  attributes: [],
};

const optionalNumber = (value: unknown): number | null =>
  value === "" || value === null || value === undefined || Number.isNaN(Number(value)) ? null : Number(value);

export function ProductFormDialog({
  open,
  product,
  categories,
  saving,
  onSubmit,
  onClose,
}: ProductFormDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: emptyValues,
  });
  const images = useFieldArray({ control, name: "images" });
  const attributes = useFieldArray({ control, name: "attributes" });

  useEffect(() => {
    if (!open) return;
    reset(
      product
        ? {
            categoryId: product.categoryId,
            name: product.name,
            slug: product.slug,
            description: product.description ?? "",
            price: centsToPesos(product.price),
            compareAtPrice: product.compareAtPrice === null ? null : centsToPesos(product.compareAtPrice),
            sku: product.sku ?? "",
            stock: product.stock,
            badge: product.badge ?? "",
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            images: product.images.map((i) => ({ url: i.url, alt: i.alt ?? "" })),
            attributes: Object.entries(product.attributes).map(([key, value]) => ({ key, value })),
          }
        : emptyValues,
    );
  }, [open, product, reset]);

  const nameField = register("name");
  const watchedImages = useWatch({ control, name: "images" });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? "Editar producto" : "Nuevo producto"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ display: "grid", gap: 4, pt: 2 }}>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                required
                label="Categoría"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={Boolean(errors.categoryId)}
                helperText={errors.categoryId?.message}
              >
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <TextField
              label="Nombre"
              required
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...nameField}
              onChange={(e) => {
                void nameField.onChange(e);
                if (!product && !dirtyFields.slug) {
                  setValue("slug", slugify(e.target.value), { shouldValidate: true });
                }
              }}
            />
            <TextField
              label="Slug"
              required
              error={Boolean(errors.slug)}
              helperText={errors.slug?.message ?? "Se genera desde el nombre y se puede editar"}
              {...register("slug")}
            />
          </Box>
          <TextField label="Descripción" multiline minRows={3} {...register("description")} />
          <Box sx={{ display: "grid", gap: 4, gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" } }}>
            <TextField
              label="Precio"
              type="number"
              required
              slotProps={{ htmlInput: { step: "0.01", min: 0 } }}
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />
            <TextField
              label="Precio anterior"
              type="number"
              slotProps={{ htmlInput: { step: "0.01", min: 0 } }}
              error={Boolean(errors.compareAtPrice)}
              helperText={errors.compareAtPrice?.message}
              {...register("compareAtPrice", { setValueAs: optionalNumber })}
            />
            <TextField
              label="Stock"
              type="number"
              required
              error={Boolean(errors.stock)}
              helperText={errors.stock?.message}
              {...register("stock", { valueAsNumber: true })}
            />
            <TextField label="SKU" {...register("sku")} />
          </Box>
          <TextField
            label="Etiqueta"
            helperText="Texto corto en la tarjeta, por ejemplo: ENVÍO GRATIS"
            {...register("badge")}
          />

          <Box sx={{ display: "grid", gap: 3 }}>
            <Typography variant="h5" component="h3">
              Imágenes
            </Typography>
            <Typography variant="caption" color="text.secondary">
              La primera es la imagen principal. Usá las flechas para cambiar el orden.
            </Typography>
            {images.fields.map((field, index) => (
              <Box key={field.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <ImagePreview
                  key={watchedImages[index]?.url}
                  url={watchedImages[index]?.url ?? ""}
                  alt={watchedImages[index]?.alt || `Imagen ${index + 1}`}
                />
                <Box sx={{ display: "grid", gap: 2, flex: 1 }}>
                  <TextField
                    label={index === 0 ? "URL (principal)" : `URL ${index + 1}`}
                    error={Boolean(errors.images?.[index]?.url)}
                    helperText={errors.images?.[index]?.url?.message}
                    {...register(`images.${index}.url`)}
                  />
                  <TextField label="Texto alternativo" {...register(`images.${index}.alt`)} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton
                    aria-label="Subir imagen"
                    disabled={index === 0}
                    onClick={() => images.swap(index, index - 1)}
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Bajar imagen"
                    disabled={index === images.fields.length - 1}
                    onClick={() => images.swap(index, index + 1)}
                  >
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton aria-label="Quitar imagen" onClick={() => images.remove(index)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <Box>
              <Button startIcon={<AddIcon />} onClick={() => images.append({ url: "", alt: "" })}>
                Agregar imagen
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "grid", gap: 3 }}>
            <Typography variant="h5" component="h3">
              Atributos
            </Typography>
            {attributes.fields.map((field, index) => (
              <Box key={field.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <TextField
                  label="Nombre"
                  error={Boolean(errors.attributes?.[index]?.key)}
                  helperText={errors.attributes?.[index]?.key?.message}
                  {...register(`attributes.${index}.key`)}
                />
                <TextField
                  label="Valor"
                  fullWidth
                  helperText="Para ofrecer opciones seleccionables, separalas con |"
                  {...register(`attributes.${index}.value`)}
                />
                <IconButton aria-label="Quitar atributo" onClick={() => attributes.remove(index)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Box>
              <Button startIcon={<AddIcon />} onClick={() => attributes.append({ key: "", value: "" })}>
                Agregar atributo
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="Activo"
                />
              )}
            />
            <Controller
              name="isFeatured"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="Destacado"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
