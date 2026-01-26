"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { ApiResponse, Pdf } from "@/types/pdf";
import type { TMutationOpts, TQueryOpts } from "@/types/tanstack";

export type TGetAllPdfsArgs = {
  search?: string;
};

export type TGetAllPdfsResult = Pdf[];

export type TGetPdfByIdArgs = {
  id: Pdf["_id"];
};

export type TGetPdfByIdResult = Pdf;

export type TUploadPdfArgs = {
  file: File;
};

export type TUploadPdfResult = {
  message?: string;
  url?: string;
  data?: Pdf;
};

export const useGetAllPdfs = (args: TGetAllPdfsArgs = {}, options?: TQueryOpts<TGetAllPdfsResult>) => {
  return useQuery({
    queryKey: ["useGetAllPdfs", args],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TGetAllPdfsResult>>("/");
      return res.data;
    },
    ...options,
  });
};

export const useGetPdfById = (args: TGetPdfByIdArgs, options?: TQueryOpts<TGetPdfByIdResult>) => {
  return useQuery({
    queryKey: ["useGetPdfById", args],
    queryFn: async () => {
      const res = await api.get<ApiResponse<TGetPdfByIdResult>>(`/${args.id}`);
      return res.data;
    },
    enabled: !!args?.id,
    ...options,
  });
};

export const useUploadPdf = (options?: TMutationOpts<TUploadPdfArgs, TUploadPdfResult>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["useUploadPdf"],
    mutationFn: async (args: TUploadPdfArgs) => {
      const formData = new FormData();
      formData.append("file", args.file);

      return api.post<TUploadPdfResult, FormData>("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    ...options,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: ["useGetAllPdfs"] });
      await options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
};
