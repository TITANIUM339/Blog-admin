import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { root } from "./lib/loaders";
import Root from "./pages/Root";
import "./styles/main.css";

const client = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: root(client),
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
