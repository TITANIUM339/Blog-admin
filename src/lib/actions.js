import { redirect } from "react-router";
import { toast } from "react-toastify";
import jwt from "./jwt";

export function signupUser(client) {
    return async ({ request }) => {
        const formData = await request.formData();

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/sign-up`,
            {
                method: "post",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.get("firstName"),
                    lastName: formData.get("lastName"),
                    username: formData.get("username"),
                    password: formData.get("password"),
                    confirmPassword: formData.get("confirmPassword"),
                }),
            },
        );

        if (response.status === 400) {
            return await response.json();
        }

        if (!response.ok) {
            toast("Could not sign up", { type: "error" });

            return;
        }

        const { token } = await response.json();

        jwt.set(token);

        client.removeQueries({ queryKey: ["user"] });

        return redirect("/");
    };
}

export function loginUser(client) {
    return async ({ request }) => {
        const formData = await request.formData();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/log-in`, {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
            }),
        });

        if (response.status === 401) {
            return true;
        }

        if (!response.ok) {
            toast("Could not log in", { type: "error" });

            return;
        }

        const { token } = await response.json();

        jwt.set(token);

        client.removeQueries({ queryKey: ["user"] });

        return redirect("/");
    };
}

export function logoutUser(client) {
    return () => {
        jwt.set();

        client.removeQueries({ queryKey: ["user"] });

        return redirect("/");
    };
}

export function createPost(client) {
    return async ({ request }) => {
        const formData = await request.formData();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt.get()}`,
            },
            body: JSON.stringify({
                title: formData.get("title"),
                thumbnail: formData.get("thumbnail"),
                content: formData.get("content"),
                published: formData.get("published") === "on",
            }),
        });

        if (response.status === 400) {
            return await response.json();
        }

        if (!response.ok) {
            toast("Could not create a new post", { type: "error" });

            return;
        }

        client.invalidateQueries({ queryKey: ["user", "posts"] });

        return redirect("/");
    };
}

export function editPost(client) {
    return async ({ request, params }) => {
        const formData = await request.formData();

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/posts/${params.postId}`,
            {
                method: "put",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt.get()}`,
                },
                body: JSON.stringify({
                    title: formData.get("title"),
                    thumbnail: formData.get("thumbnail"),
                    content: formData.get("content"),
                    published: formData.get("published") === "on",
                }),
            },
        );

        if (response.status === 400) {
            return await response.json();
        }

        if (!response.ok) {
            toast("Could not save changes", { type: "error" });

            return;
        }

        client.invalidateQueries({ queryKey: ["user", "posts"] });

        return redirect("/");
    };
}
