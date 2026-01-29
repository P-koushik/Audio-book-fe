"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import googleimage from "@/assets/logos/googleimage.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

import { signUpWithEmail } from "@/services/auth/email-password";
import { signInWithGooglePopup } from "@/services/auth/google";

export default function Login05() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          <h3 className="text-foreground dark:text-foreground mt-2 text-center text-lg font-bold">
            Create new account for AudioBook
          </h3>
        </div>

        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);

                if (password !== confirmPassword) {
                  setError("Passwords do not match.");
                  return;
                }

                setSubmitting(true);
                try {
                  const credential = await signUpWithEmail(email, password);
                  if (name.trim()) {
                    await updateProfile(credential.user, {
                      displayName: name.trim(),
                    });
                  }
                  redirectAfterAuth();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Failed to create account.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div>
                <Label
                  htmlFor="name-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name-login-05"
                  name="name-login-05"
                  autoComplete="name"
                  placeholder="Name"
                  className="mt-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="email-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email-login-05"
                  name="email-login-05"
                  autoComplete="email"
                  placeholder="ephraim@blocks.so"
                  className="mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="password-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  id="password-login-05"
                  name="password-login-05"
                  autoComplete="new-password"
                  placeholder="Password"
                  className="mt-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Label
                  htmlFor="confirm-password-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Confirm password
                </Label>
                <Input
                  type="password"
                  id="confirm-password-login-05"
                  name="confirm-password-login-05"
                  autoComplete="new-password"
                  placeholder="Password"
                  className="mt-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}

              <Button type="submit" className="mt-4 w-full py-2 font-medium" disabled={submitting}>
                Create account
              </Button>

              <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
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
                      setError(e instanceof Error ? e.message : "Failed to sign up with Google.");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Image src={googleimage} alt="google image" width={15} height={20} />
                    <span className="text-sm font-medium">Signup with Google</span>
                  </span>
                </Button>
              </div>

              <p className="text-muted-foreground dark:text-muted-foreground text-center text-xs">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 capitalize"
                >
                  Terms of use
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 capitalize"
                >
                  Privacy policy
                </a>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-muted-foreground dark:text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
