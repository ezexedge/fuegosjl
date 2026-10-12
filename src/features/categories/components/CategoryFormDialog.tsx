"use client";

import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { slugify } from "@/lib/utils";
import { categoryFormSchema, type CategoryFormValues } from "../schemas";
import type { CategoryWithCount } from "../types";

interface CategoryFormDialogProps {
  open: boolean;
  category: CategoryWithCount | null;
  saving: boolean;
  onSubmit: (values: CategoryFormValues) => void;
  onClose: () => void;
}

const emptyValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  sortOrder: 0,
  isActive: true,
};

export function CategoryFormDialog({ open, category, saving, onSubmit, onClose }: CategoryFormDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!open) return;
    reset(
      category
        ? {
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
            imageUrl: category.imageUrl ?? "",
            sortOrder: category.sortOrder,
            isActive: category.isActive,
          }
        : emptyValues,
    );
  }, [open, category, reset]);

  const imageUrl = useWatch({ control, name: "imageUrl" });
  const nameField = register("name");

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{category ? "Editar categoría" : "Nueva categoría"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent sx={{ display: "grid", gap: 4, pt: 2 }}>
          <TextField
            label="Nombre"
            required
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...nameField}
            onChange={(e) => {
              void nameField.onChange(e);
              if (!category && !dirtyFields.slug) {
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
          <TextField label="Descripción" multiline minRows={2} {...register("description")} />
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <TextField
              label="URL de la imagen"
              fullWidth
              error={Boolean(errors.imageUrl)}
              helperText={errors.imageUrl?.message ?? "Formatos jpg, png o webp"}
              {...register("imageUrl")}
            />
            <ImagePreview url={imageUrl} alt="Vista previa de la categoría" />
          </Box>
          <TextField
            label="Orden"
            type="number"
            error={Boolean(errors.sortOrder)}
            helperText={errors.sortOrder?.message}
            {...register("sortOrder", { valueAsNumber: true })}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label="Activa"
              />
            )}
          />
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
