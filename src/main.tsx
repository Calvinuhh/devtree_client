import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./main.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>
);
