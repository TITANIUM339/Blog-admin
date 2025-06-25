import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Protected from "./components/Protected";
import { createPost, loginUser, logoutUser, signupUser } from "./lib/actions";
import { loadPosts, loadUser } from "./lib/loaders";
import CreatePost from "./pages/CreatePost";
import Error from "./pages/Error";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import Root from "./pages/Root";
import Signup from "./pages/Signup";
import "./styles/style.css";

const client = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        loader: loadUser(client),
        hydrateFallbackElement: <Loading />,
        id: "root",
        children: [
            {
                index: true,
                element: (
                    <Protected>
                        <MyPosts />
                    </Protected>
                ),
                loader: loadPosts(client),
            },
            {
                path: "create-post",
                action: createPost(client),
                element: (
                    <Protected>
                        <CreatePost />
                    </Protected>
                ),
            },
            {
                path: "sign-up",
                element: <Signup />,
                action: signupUser(client),
            },
            { path: "log-in", element: <Login />, action: loginUser(client) },
            { path: "log-out", action: logoutUser(client) },
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
