import { useEffect } from "react";
import { useRouteLoaderData, useNavigate } from "react-router";

export default function Protected({ children }) {
    const user = useRouteLoaderData("root");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/log-in", { replace: true });
        }
    });

    return user ? children : null;
}
