import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

const baseUrl = import.meta.env.BASE_URL ?? "/";
const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

// 生产环境下可通过 VITE_API_URL 指定外部后端地址（如 GitHub Pages 部署时）
const apiUrl =
  import.meta.env.VITE_API_URL ||
  (normalizedBase === "/" ? "/api/trpc" : `${normalizedBase}api/trpc`);

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: apiUrl,
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
