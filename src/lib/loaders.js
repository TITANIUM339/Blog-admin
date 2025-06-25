import { getPosts, getUser } from "./queries";

export function root(client) {
    return async () => await client.ensureQueryData(getUser());
}

export function myPosts(client) {
    return async ({ request }) =>
        await client.fetchQuery(
            getPosts(new URL(request.url).searchParams.get("filter") || "all"),
        );
}
