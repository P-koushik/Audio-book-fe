import { RedirectIfAuthed } from "@/services/auth/auth-provider";
import { Providers } from "../providers";

export default function Authlayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <RedirectIfAuthed>{children}</RedirectIfAuthed>
                </Providers>
            </body>
        </html>
    );
}
