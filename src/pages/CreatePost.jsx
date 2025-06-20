import { useId } from "react";
import { Form, useActionData, useNavigation } from "react-router";
import Button from "../components/Button";
import HeadingContainer from "../components/HeadingContainer";
import Spinner from "../components/Spinner";
import TextEditor from "../components/TextEditor";

export default function CreatePost() {
    const titleId = useId();
    const thumbnailId = useId();
    const contentId = useId();
    const publishedId = useId();

    const navigation = useNavigation();

    const { errors } = useActionData() || {};

    const errorMessages = {};
    errors?.forEach((error) => (errorMessages[error.path] = error.msg));

    return (
        <div className="flex h-full items-center justify-center">
            <div className="grid-rows[min-content_1fr] grid w-full max-w-2xl shadow-lg">
                <HeadingContainer>
                    <div className="pt-6 pr-2 pb-6 pl-2">
                        <h1 className="text-center text-xl font-medium text-teal-900">
                            Create a New Post
                        </h1>
                    </div>
                </HeadingContainer>
                <Form
                    method="post"
                    action="/create-post"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={titleId}
                            className="text-lg font-medium"
                        >
                            Title *
                        </label>
                        <input
                            id={titleId}
                            type="text"
                            placeholder="My awesome post"
                            autoComplete="off"
                            name="title"
                            required
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.title && (
                            <p className="text-red-600">
                                {errorMessages.title}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={thumbnailId}
                            className="text-lg font-medium"
                        >
                            Thumbnail URL
                        </label>
                        <input
                            id={thumbnailId}
                            type="url"
                            placeholder="https://example.com/thumbnail.jpg"
                            autoComplete="off"
                            name="thumbnail"
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.thumbnail && (
                            <p className="text-red-600">
                                {errorMessages.thumbnail}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={contentId}
                            className="text-lg font-medium"
                        >
                            Content *
                        </label>
                        <TextEditor id={contentId} textareaName="content" />
                        {errorMessages.content && (
                            <p className="text-red-600">
                                {errorMessages.content}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <label htmlFor={publishedId}>Publish this post?</label>
                        <input
                            type="checkbox"
                            name="published"
                            id={publishedId}
                        />
                    </div>
                    <Button
                        className="flex justify-center"
                        type="submit"
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting" ? (
                            <Spinner size={24} />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
