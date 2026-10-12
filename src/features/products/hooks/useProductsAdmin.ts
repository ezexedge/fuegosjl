"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http, toQuery } from "@/lib/http";
import type { Paginated } from "@/lib/schemas";
import type { ProductInput, ProductPatch } from "../schemas";
import type { ProductWithRelations } from "../types";

interface ListParams {
  page: number;
  limit: number;
  search: string;
  category: string;
}

export function useProductsAdmin(params: ListParams) {
  return useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () =>
      http<Paginated<ProductWithRelations>>(`/api/products?${toQuery({ ...params, all: 1 })}`),
    placeholderData: keepPreviousData,
  });
}

export interface CategoryOption {
  id: number;
  name: string;
}

/** Categorías (incluye inactivas) para el selector del formulario y el filtro. */
export function useCategoryOptions() {
  return useQuery({
    queryKey: ["admin", "category-options"],
    queryFn: async () => {
      const result = await http<Paginated<CategoryOption>>(
        `/api/categories?${toQuery({ all: 1, limit: 100 })}`,
      );
      return result.items.map(({ id, name }) => ({ id, name }));
    },
  });
}

export function useProductMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const create = useMutation({
    mutationFn: (input: ProductInput) =>
      http<ProductWithRelations>("/api/products", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: ProductPatch }) =>
      http<ProductWithRelations>(`/api/products/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => http<{ id: number }>(`/api/products/${id}`, { method: "DELETE" }),
    onSuccess: invalidate,
  });
  return { create, update, remove };
}
