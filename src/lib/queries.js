import jwt from "./jwt";

export const getUser = {
    queryKey: ["user"],
    async queryFn() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt.get()}`,
            },
        });

        if (response.status === 401) {
            return null;
        }

        if (!response.ok) {
            throw response;
        }

        return await response.json();
    },
};
