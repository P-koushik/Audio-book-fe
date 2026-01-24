"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { auth } from "@/services/firebase";

export type AuthUser = {
  _id?: string;
  firebase_uid?: string;
  email?: string;
  name?: string;
  photo_url?: string;
  // Back-compat (some components still expect Firebase-style fields)
  uid?: string;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: unknown;
} | null;

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
    const err = error as Record<string, unknown>;

    if (typeof err.message === "string") {
      return err.message;
    }

    const status =
      (err.response as Record<string, unknown> | undefined)?.status ??
      err.status ??
      err.status_code;

    if (typeof status === "number") return `Request failed (${status}).`;
  }

  return "Something went wrong.";
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mapFirebaseUserToAuthUser = (firebaseUser: FirebaseUser): Exclude<AuthUser, null> => {
  return {
    firebase_uid: firebaseUser.uid,
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? undefined,
    name: firebaseUser.displayName ?? firebaseUser.email ?? undefined,
    displayName: firebaseUser.displayName,
    photo_url: firebaseUser.photoURL ?? undefined,
    photoURL: firebaseUser.photoURL,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  const syncSigninWithBackend = async (): Promise<void> => {
    await api.post("/signin");
  };

  const refreshUser = async () => {
    try {
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      setUser(mapFirebaseUserToAuthUser(firebaseUser));

      // Ensure the backend has the latest Firebase user info in DB
      await syncSigninWithBackend();
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

        setUser(mapFirebaseUserToAuthUser(firebaseUser));

        // Sync user to backend DB (middleware will verify token + upsert user)
        await syncSigninWithBackend();
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
