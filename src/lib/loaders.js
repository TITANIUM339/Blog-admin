import { redirect } from "react-router";
import { getPost, getPosts, getUser } from "./queries";

export function loadUser(client) {
    return async () => await client.ensureQueryData(getUser());
}

export function loadPosts(client) {
    return async ({ request }) => {
        const user = await client.ensureQueryData(getUser());

        if (!user) {
            return redirect("/log-in");
        }

        return await client.fetchQuery(
            getPosts(new URL(request.url).searchParams.get("filter") || "all"),
        );
    };
}

export function loadPost(client) {
    return async ({ params }) => {
        const user = await client.ensureQueryData(getUser());

        if (!user) {
            return redirect("/log-in");
        }

        return await client.fetchQuery(getPost(params.postId));
    };
}

export function protectedRoute(client) {
    return async () => {
        const user = await client.ensureQueryData(getUser());

        if (!user) {
            return redirect("/log-in");
        }
    };
}
