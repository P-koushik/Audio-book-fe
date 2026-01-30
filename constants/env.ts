export const env = {
  // In Next.js client code, only `NEXT_PUBLIC_*` vars are available.
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000/api/v1",
};
