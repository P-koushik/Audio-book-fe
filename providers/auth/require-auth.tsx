"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/auth/auth-provider";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (loading || user) return;
    const next = encodeURIComponent(pathname || "/home");
    router.replace(`/login?next=${next}`);
  }, [loading, user, router, pathname]);

  if (loading || !user) return null;
  return <>{children}</>;
}

