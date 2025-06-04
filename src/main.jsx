import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { loginUser, signupUser } from "./lib/actions";
import { root } from "./lib/loaders";
import Login from "./pages/Login";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import "./styles/main.css";

const client = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: root(client),
        children: [
            {
                path: "sign-up",
                element: <Signup />,
                action: signupUser(client),
            },
            { path: "log-in", element: <Login />, action: loginUser(client) },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>,
);
