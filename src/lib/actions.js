import { redirect } from "react-router";
import jwt from "./jwt";
import { getUser } from "./queries";

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
            throw response;
        }

        const { token } = await response.json();

        jwt.set(token);

        client.removeQueries({ queryKey: getUser.queryKey });

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
            throw response;
        }

        const { token } = await response.json();

        jwt.set(token);

        client.removeQueries({ queryKey: getUser.queryKey });

        return redirect("/");
    };
}

export function logoutUser(client) {
    return () => {
        jwt.set();

        client.removeQueries({ queryKey: getUser.queryKey });

        return redirect("/");
    };
}
