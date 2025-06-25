import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
    BsBoxArrowUpRight,
    BsPencilSquare,
    BsPlusLg,
    BsTrash,
} from "react-icons/bs";
import { Link, useLoaderData, useNavigate, useNavigation } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import Switch from "../components/Switch";
import jwt from "../lib/jwt";

export default function MyPosts() {
    const loaderData = useLoaderData();

    // Creating a state for posts to allow instant updates for an optimistic UI.
    const [posts, setPosts] = useState(loaderData.posts);
    const [filter, setFilter] = useState("all");

    const navigate = useNavigate();

    const navigation = useNavigation();

    const client = useQueryClient();

    const draftMutation = useMutation({
        async mutationFn(post) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${post.id}`,
                {
                    method: "put",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                    body: JSON.stringify({
                        published: !post.published,
                    }),
                },
            );

            if (!response.ok) {
                throw response;
            }
        },
        onMutate(post) {
            const updatedPosts = {
                posts: posts.map((oldPost) =>
                    oldPost.id === post.id
                        ? { ...oldPost, published: !post.published }
                        : oldPost,
                ),
            };

            // Optimistically updating UI.
            client.setQueryData(["user", "posts"], updatedPosts);
            setPosts(updatedPosts.posts);

            // Returning old state to revert back to incase the mutation fails.
            return { posts };
        },
        onError(_error, variables, context) {
            // Reverting back to old state.
            client.setQueryData(["user", "posts"], context);
            setPosts(context.posts);

            toast(
                `Error ${variables.published ? "unpublishing" : "publishing"} post`,
                { type: "error" },
            );
        },
        onSuccess() {
            // Invalidating queries to prevent showing old data when switching between filters.
            client.invalidateQueries({ queryKey: ["user", "posts"] });
        },
    });

    const deleteMutation = useMutation({
        async mutationFn(post) {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/posts/${post.id}`,
                {
                    method: "delete",
                    mode: "cors",
                    headers: {
                        Authorization: `Bearer ${jwt.get()}`,
                    },
                },
            );

            if (!response.ok) {
                throw response;
            }
        },
        onMutate(post) {
            const updatedPosts = {
                posts: [...posts.filter((oldPost) => oldPost.id !== post.id)],
            };

            client.setQueryData(["user", "posts"], updatedPosts);
            setPosts(updatedPosts.posts);

            return { posts };
        },
        onError(_error, _variables, context) {
            client.setQueryData(["user", "posts"], context);
            setPosts(context.posts);

            toast("Error deleting post", { type: "error" });
        },
        onSuccess() {
            client.invalidateQueries({ queryKey: ["user", "posts"] });
        },
    });

    useEffect(() => setPosts(loaderData.posts), [loaderData.posts]);

    return (
        <>
            <div className="mt-16 flex justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-medium">My posts</h1>
                    {navigation.state === "loading" ? (
                        <Spinner size={36} />
                    ) : null}
                </div>
                <select
                    className="rounded-md border border-gray-300 p-1 outline-teal-700"
                    name="filter"
                    value={filter}
                    onChange={(event) => {
                        setFilter(event.target.value);

                        navigate(`/?filter=${event.target.value}`);
                    }}
                    aria-label="Filter posts"
                    disabled={navigation.state === "loading"}
                >
                    <option value="all">All</option>
                    <option value="drafts">Drafts</option>
                    <option value="published">Published</option>
                </select>
            </div>
            {posts.length ? (
                <ul className="mt-8 border border-gray-200 bg-white shadow">
                    {posts.map((post) => (
                        <li
                            key={post.id}
                            className="grid grid-cols-[1fr_min-content] grid-rows-[min-content_min-content] gap-2 border-gray-200 p-4 not-last:border-b"
                        >
                            <div className="overflow-hidden text-ellipsis">
                                <Link
                                    to={`${import.meta.env.VITE_BLOG_URL}/posts/${post.id}`}
                                    className="w flex w-max items-center gap-2 text-xl font-medium text-teal-700 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {post.title}
                                    <BsBoxArrowUpRight size={16} />
                                </Link>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <Button
                                    variant="secondary"
                                    style={{ padding: 6 }}
                                    Component={Link}
                                    to={`/edit-post/${post.id}`}
                                >
                                    <BsPencilSquare size={18} />
                                </Button>
                                <Button
                                    variant="danger"
                                    style={{ padding: 6 }}
                                    onClick={() => deleteMutation.mutate(post)}
                                    disabled={navigation.state === "loading"}
                                    aria-label="Delete post"
                                >
                                    <BsTrash size={18} />
                                </Button>
                            </div>
                            <p className="w-max text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    },
                                )}
                            </p>
                            <div className="flex items-center gap-2">
                                <p>{post.published ? "Published" : "Draft"}</p>
                                <Switch
                                    size={20}
                                    active={post.published}
                                    onClick={() => draftMutation.mutate(post)}
                                    disabled={
                                        (draftMutation.isPending &&
                                            draftMutation.variables?.id ===
                                                post.id) ||
                                        navigation.state === "loading"
                                    }
                                    aria-label={
                                        post.published
                                            ? "Unpublish post"
                                            : "Publish post"
                                    }
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <h2 className="mt-16 mb-16 text-center text-2xl">
                        Nothing to see here
                    </h2>
                </div>
            )}
            <div className="mt-4 flex justify-end">
                <Button
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                    Component={Link}
                    to="/create-post"
                >
                    <BsPlusLg size={20} />
                    Create new post
                </Button>
            </div>
        </>
    );
}
