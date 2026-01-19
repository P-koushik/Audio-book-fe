"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { auth } from "@/services/firebase";

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            loading,
            signOut: () => signOut(auth),
        }),
        [user, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuth must be used within <AuthProvider />");
    }
    return value;
}

export function RequireAuth({
    children,
    redirectTo = "/login",
}: {
    children: ReactNode;
    redirectTo?: string;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (loading) return;
        if (!user) {
            const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
            router.replace(`${redirectTo}${next}`);
        }
    }, [loading, user, router, pathname, redirectTo]);

    if (loading) return null;
    if (!user) return null;
    return children;
}

export function RedirectIfAuthed({
    children,
    redirectTo = "/home",
}: {
    children: ReactNode;
    redirectTo?: string;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (loading) return;
        if (user) {
            const next = searchParams?.get("next");
            router.replace(next || redirectTo);
        }
    }, [loading, user, router, redirectTo, searchParams]);

    if (loading) return null;
    if (user) return null;
    return children;
}

