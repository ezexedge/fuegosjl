"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { CategoryFilterOption } from "../services/products.service";

interface ProductsFilterProps {
  categories: CategoryFilterOption[];
  category: string;
  search: string;
}

export function ProductsFilter({ categories, category, search }: ProductsFilterProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [draftCategory, setDraftCategory] = useState(category);
  const [draftSearch, setDraftSearch] = useState(search);

  const apply = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (draftCategory) params.set("category", draftCategory);
    if (draftSearch.trim()) params.set("search", draftSearch.trim());
    const query = params.toString();
    router.push(query ? `/productos?${query}` : "/productos");
    setOpen(false);
  };

  const clear = () => {
    setDraftCategory("");
    setDraftSearch("");
    router.push("/productos");
    setOpen(false);
  };

  const activeCount = (category ? 1 : 0) + (search ? 1 : 0);

  return (
    <>
      <Button
        variant="text"
        color="secondary"
        onClick={() => {
          setDraftCategory(category);
          setDraftSearch(search);
          setOpen(true);
        }}
        sx={{ borderBottom: 1, borderRadius: 0, px: 1, py: 0.5 }}
      >
        Filtrar{activeCount ? ` (${activeCount})` : ""}
      </Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={apply} sx={{ width: { xs: 300, sm: 360 }, p: 6, display: "grid", gap: 6, alignContent: "start" }}>
          <Typography variant="h4" component="h2">
            Filtrar productos
          </Typography>
          <TextField
            label="Buscar por nombre"
            value={draftSearch}
            onChange={(e) => setDraftSearch(e.target.value)}
          />
          <FormControl>
            <FormLabel>Categoría</FormLabel>
            <RadioGroup value={draftCategory} onChange={(e) => setDraftCategory(e.target.value)}>
              <FormControlLabel value="" control={<Radio />} label="Todas" />
              {categories.map((c) => (
                <FormControlLabel key={c.id} value={c.slug} control={<Radio />} label={c.name} />
              ))}
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button type="submit" variant="contained" color="secondary" fullWidth>
              Aplicar
            </Button>
            <Button onClick={clear} color="secondary" fullWidth>
              Limpiar
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
