import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
    createPost,
    editPost,
    loginUser,
    logoutUser,
    signupUser,
} from "./lib/actions";
import { loadPost, loadPosts, loadUser, protectedRoute } from "./lib/loaders";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
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
        hydrateFallbackElement: <Loading />,
        loader: loadUser(client),
        children: [
            {
                index: true,
                element: <MyPosts />,
                loader: loadPosts(client),
            },
            {
                path: "create-post",
                element: <CreatePost />,
                loader: protectedRoute(client),
                action: createPost(client),
            },
            {
                path: "edit-post/:postId",
                element: <EditPost />,
                loader: loadPost(client),
                action: editPost(client),
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
