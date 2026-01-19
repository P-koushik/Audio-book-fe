import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/services/auth/auth-provider";

export const metadata: Metadata = {
  title: "Audio Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
