import jwt from "./jwt";

export function getUser() {
    return {
        queryKey: ["user", jwt.get()],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/user`,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                },
            );

            if (response.status === 401) {
                return null;
            }

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
    };
}

export function getPosts(filter) {
    return {
        queryKey: ["user", "posts", filter],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts?myPosts=true${filter === "published" || filter === "drafts" ? `&published=${filter === "published"}` : ""}`,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                },
            );

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
        staleTime: Infinity,
    };
}

export function getPost(id) {
    return {
        queryKey: ["user", "posts", id],
        async queryFn() {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${id}`,
                {
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                },
            );

            if (!response.ok) {
                throw response;
            }

            return await response.json();
        },
        staleTime: Infinity,
    };
}
