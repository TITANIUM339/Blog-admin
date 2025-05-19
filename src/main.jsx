import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/main.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h1 className="text-9xl text-amber-300">Hello World</h1>,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
