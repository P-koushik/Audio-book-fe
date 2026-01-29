"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import googleimage from "@/assets/logos/googleimage.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { sendPasswordReset, signInWithEmail } from "@/services/auth/email-password";
import { signInWithGooglePopup } from "@/services/auth/google";

export default function Login04() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectAfterAuth = () => {
    const next = searchParams.get("next");
    router.replace(next || "/book");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center space-x-1.5">
            <p className="text-foreground dark:text-foreground text-lg font-medium">Acme</p>
          </div>
          <h3 className="text-foreground dark:text-foreground mt-6 text-lg font-semibold">
            Sign in to your account
          </h3>
          <p className="text-muted-foreground dark:text-muted-foreground mt-2 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 font-medium"
            >
              Sign up
            </Link>
          </p>

          <div className="mt-8 flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              variant="outline"
              className="mt-2 flex-1 items-center justify-center space-x-2 py-2 sm:mt-0"
              type="button"
              disabled={submitting}
              onClick={async () => {
                setError(null);
                setSubmitting(true);
                try {
                  await signInWithGooglePopup();
                  redirectAfterAuth();
                } catch (e) {
                  setError(e instanceof Error ? e.message : "Failed to sign in.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Image src={googleimage} alt="google image" width={15} height={20} />
                <span className="text-sm font-medium">Login with Google</span>
              </span>
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">or</span>
            </div>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSubmitting(true);
              try {
                await signInWithEmail(email, password);
                redirectAfterAuth();
              } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to sign in.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div>
              <Label
                htmlFor="email-login-04"
                className="text-foreground dark:text-foreground text-sm font-medium"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email-login-04"
                name="email-login-04"
                autoComplete="email"
                placeholder="ephraim@blocks.so"
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="password-login-04"
                className="text-foreground dark:text-foreground text-sm font-medium"
              >
                Password
              </Label>
              <Input
                type="password"
                id="password-login-04"
                name="password-login-04"
                autoComplete="current-password"
                placeholder="********"
                className="mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="mt-4 w-full py-2 font-medium" disabled={submitting}>
              Sign in
            </Button>
          </form>

          <p className="text-muted-foreground dark:text-muted-foreground mt-6 text-sm">
            Forgot your password?{" "}
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 h-auto p-0 font-medium"
              disabled={submitting}
              onClick={async () => {
                if (!email) {
                  setError("Enter your email first to reset your password.");
                  return;
                }
                setError(null);
                setSubmitting(true);
                try {
                  await sendPasswordReset(email);
                } catch (e) {
                  setError(e instanceof Error ? e.message : "Failed to send reset email.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              Reset password
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
