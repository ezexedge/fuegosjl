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
import { useCategoriesAdmin, useCategoryMutations } from "../hooks/useCategoriesAdmin";
import type { CategoryFormValues } from "../schemas";
import type { CategoryWithCount } from "../types";
import { CategoryFormDialog } from "./CategoryFormDialog";

const PAGE_SIZES = [10, 25, 50];

export function CategoriesAdmin() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<CategoryWithCount | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<CategoryWithCount | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const { data, isLoading, isError, error } = useCategoriesAdmin({ page, limit, search });
  const { create, update, remove } = useCategoryMutations();

  const fail = (err: unknown) =>
    setToast({ severity: "error", message: err instanceof Error ? err.message : "Ocurrió un error" });

  const openForm = (category: CategoryWithCount | null) => {
    setEditing(category);
    setFormOpen(true);
  };

  const submit = (values: CategoryFormValues) => {
    const payload = {
      ...values,
      description: values.description || null,
      imageUrl: values.imageUrl || null,
    };
    const done = () => {
      setFormOpen(false);
      setToast({ severity: "success", message: editing ? "Categoría actualizada" : "Categoría creada" });
    };
    if (editing) update.mutate({ id: editing.id, patch: payload }, { onSuccess: done, onError: fail });
    else create.mutate(payload, { onSuccess: done, onError: fail });
  };

  const confirmDelete = () => {
    if (!deleting) return;
    remove.mutate(deleting.id, {
      onSuccess: () => {
        setDeleting(null);
        setToast({ severity: "success", message: "Categoría eliminada" });
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
          Categorías
        </Typography>
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
          Nueva
        </Button>
      </Box>

      {isError ? <Alert severity="error">{error.message}</Alert> : null}

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell align="right">Productos</TableCell>
              <TableCell align="right">Orden</TableCell>
              <TableCell align="center">Activa</TableCell>
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
                  <Typography color="text.secondary">No hay categorías</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data?.items.map((category) => (
                <TableRow key={category.id} hover>
                  <TableCell>
                    <ImagePreview key={category.imageUrl} url={category.imageUrl ?? ""} alt={category.name} size={48} />
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell align="right">{category.productCount}</TableCell>
                  <TableCell align="right">{category.sortOrder}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={category.isActive}
                      slotProps={{ input: { "aria-label": `Activar ${category.name}` } }}
                      onChange={(e) =>
                        update.mutate(
                          { id: category.id, patch: { isActive: e.target.checked } },
                          { onError: fail },
                        )
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Editar ${category.name}`} onClick={() => openForm(category)}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton aria-label={`Eliminar ${category.name}`} onClick={() => setDeleting(category)}>
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

      <CategoryFormDialog
        open={formOpen}
        category={editing}
        saving={create.isPending || update.isPending}
        onSubmit={submit}
        onClose={() => setFormOpen(false)}
      />
      <ConfirmDialog
        open={deleting !== null}
        title="Eliminar categoría"
        message={`¿Eliminar "${deleting?.name ?? ""}"? Esta acción no se puede deshacer. Si tiene productos, no se podrá eliminar.`}
        loading={remove.isPending}
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </Box>
  );
}
