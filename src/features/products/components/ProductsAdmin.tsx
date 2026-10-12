"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { Toast, type ToastState } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/format";
import { pesosToCents } from "@/lib/utils";
import { useCategoryOptions, useProductMutations, useProductsAdmin } from "../hooks/useProductsAdmin";
import type { ProductFormValues } from "../schemas";
import type { ProductWithRelations } from "../types";
import { ProductFormDialog } from "./ProductFormDialog";

const PAGE_SIZES = [10, 25, 50];

export function ProductsAdmin() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [editing, setEditing] = useState<ProductWithRelations | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<ProductWithRelations | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const { data, isLoading, isError, error } = useProductsAdmin({ page, limit, search, category });
  const { data: categories = [] } = useCategoryOptions();
  const { create, update, remove } = useProductMutations();

  const fail = (err: unknown) =>
    setToast({ severity: "error", message: err instanceof Error ? err.message : "Ocurrió un error" });

  const openForm = (product: ProductWithRelations | null) => {
    setEditing(product);
    setFormOpen(true);
  };

  const submit = (values: ProductFormValues) => {
    const attributes: Record<string, string> = {};
    for (const { key, value } of values.attributes) attributes[key] = value;
    const payload = {
      categoryId: values.categoryId,
      name: values.name,
      slug: values.slug,
      description: values.description || null,
      price: pesosToCents(values.price),
      compareAtPrice: values.compareAtPrice === null ? null : pesosToCents(values.compareAtPrice),
      sku: values.sku || null,
      stock: values.stock,
      badge: values.badge || null,
      isActive: values.isActive,
      isFeatured: values.isFeatured,
      attributes,
      images: values.images.map((i) => ({ url: i.url, alt: i.alt || null })),
    };
    const done = () => {
      setFormOpen(false);
      setToast({ severity: "success", message: editing ? "Producto actualizado" : "Producto creado" });
    };
    if (editing) update.mutate({ id: editing.id, patch: payload }, { onSuccess: done, onError: fail });
    else create.mutate(payload, { onSuccess: done, onError: fail });
  };

  const confirmDelete = () => {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => {
        setDeleting(null);
        setToast({ severity: "success", message: "Producto eliminado" });
      },
      onError: (err) => {
        setDeleting(null);
        fail(err);
      },
    });
  };

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box sx={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "wrap" }}>
        <Typography variant="h3" component="h1" sx={{ flex: 1 }}>
          Productos
        </Typography>
        <TextField
          select
          size="small"
          label="Categoría"
          value={category}
          sx={{ minWidth: 180 }}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={String(c.id)}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          label="Buscar"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => openForm(null)}>
          Nuevo
        </Button>
      </Box>

      {isError ? <Alert severity="error">{error.message}</Alert> : null}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="center">Activo</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : data?.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">No hay productos</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data?.items.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <ImagePreview
                      key={product.images[0]?.url}
                      url={product.images[0]?.url ?? ""}
                      alt={product.images[0]?.alt ?? product.name}
                      size={48}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell align="right">{formatPrice(product.price)}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={product.isActive}
                      slotProps={{ input: { "aria-label": `Activar ${product.name}` } }}
                      onChange={(e) =>
                        update.mutate(
                          { id: product.id, patch: { isActive: e.target.checked } },
                          { onError: fail },
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Editar ${product.name}`} onClick={() => openForm(product)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label={`Eliminar ${product.name}`} onClick={() => setDeleting(product)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.pagination.total ?? 0}
          page={page - 1}
          rowsPerPage={limit}
          rowsPerPageOptions={PAGE_SIZES}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
          onPageChange={(_, next) => setPage(next + 1)}
          onRowsPerPageChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        />
      </TableContainer>

      <ProductFormDialog
        open={formOpen}
        product={editing}
        categories={categories}
        saving={create.isPending || update.isPending}
        onSubmit={submit}
        onClose={() => setFormOpen(false)}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="Eliminar producto"
        message={`¿Eliminar "${deleting?.name ?? ""}"? Esta acción no se puede deshacer.`}
        loading={remove.isPending}
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </Box>
  );
}
