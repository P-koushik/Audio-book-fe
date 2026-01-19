"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/services/auth/auth-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

