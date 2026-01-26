import type { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

export type TQueryOpts<TData, TError = unknown> = Omit<
  UseQueryOptions<TData, TError, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

export type TMutationOpts<TArgs, TResult, TError = unknown> = Omit<
  UseMutationOptions<TResult, TError, TArgs, unknown>,
  "mutationKey" | "mutationFn"
>;

