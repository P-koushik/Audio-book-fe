"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {
  User as FirebaseUser,
  getIdToken,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { auth } from "@/services/firebase";

export type AuthUser = {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: unknown;
} | null;

type ApiResponse<T> = {
  data?: T;
  message?: string;
  status_code?: number;
};

export type AuthContextType = {
  user: AuthUser;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
};

const getAuthErrorMessage = (error: unknown) => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }

    const status =
      (error as any)?.response?.status ?? (error as any)?.status ?? (error as any)?.status_code;

    if (typeof status === "number") return `Request failed (${status}).`;
  }

  return "Something went wrong.";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Returns ONLY the payload (ApiResponse), not AxiosResponse
  const fetchBackendUser = async (token: string): Promise<ApiResponse<AuthUser>> => {
    const res = await api.get<ApiResponse<AuthUser>>("/auth/login", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  const refreshUser = async () => {
    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      const token = await getIdToken(firebaseUser);
      const payload = await fetchBackendUser(token);

      if (!payload.status_code) {
        setUser(payload.data ?? null);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("[AuthProvider] Error refreshing user", error);
      toast.error(getAuthErrorMessage(error), { id: "auth-error" });
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true);

      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        const token = await getIdToken(firebaseUser);
        if (!token) {
          toast.error("Failed to get authentication token.", { id: "auth-error" });
          setUser(null);
          return;
        }

        const payload = await fetchBackendUser(token);

        if (!payload.status_code) {
          setUser(payload.data ?? null);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("[AuthProvider] Error fetching user", error);
        toast.error(getAuthErrorMessage(error), { id: "auth-error" });
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("[AuthProvider] Error signing out", error);
      toast.error(getAuthErrorMessage(error), { id: "auth-error" });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: loading,
        refreshUser,
        signOut,
        logout: signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
