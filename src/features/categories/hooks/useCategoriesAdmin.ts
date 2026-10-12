"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { http, toQuery } from "@/lib/http";
import type { Paginated } from "@/lib/schemas";
import type { Category } from "@/db/schema";
import type { CategoryInput, CategoryPatch } from "../schemas";
import type { CategoryWithCount } from "../types";

const KEY = ["admin", "categories"] as const;

interface ListParams {
  page: number;
  limit: number;
  search: string;
}

export function useCategoriesAdmin(params: ListParams) {
  return useQuery({
    queryKey: [...KEY, params],
    queryFn: () =>
      http<Paginated<CategoryWithCount>>(`/api/categories?${toQuery({ ...params, all: 1 })}`),
    placeholderData: keepPreviousData,
  });
}

export function useCategoryMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin"] });

  const create = useMutation({
    mutationFn: (input: CategoryInput) =>
      http<Category>("/api/categories", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: invalidate,
  });
  const update = useMutation({
    mutationFn: ({ id, patch }: { id: number; patch: CategoryPatch }) =>
      http<Category>(`/api/categories/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
    onSuccess: invalidate,
  });
  const remove = useMutation({
    mutationFn: (id: number) => http<{ id: number }>(`/api/categories/${id}`, { method: "DELETE" }),
    onSuccess: invalidate,
  });
  return { create, update, remove };
}
