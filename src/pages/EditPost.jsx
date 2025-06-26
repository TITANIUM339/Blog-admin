import { useId } from "react";
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigation,
} from "react-router";
import Button from "../components/Button";
import ErrorText from "../components/ErrorText";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import TextEditor from "../components/TextEditor";

export default function EditPost() {
    const titleId = useId();
    const thumbnailId = useId();
    const contentId = useId();
    const publishedId = useId();

    const { post } = useLoaderData();

    const navigation = useNavigation();

    const { errors } = useActionData() || {};

    const errorMessages = {};
    errors?.forEach((error) => (errorMessages[error.path] = error.msg));

    return (
        <div className="flex h-full items-center justify-center">
            <FormContainer title="Edit post" size="l">
                <Form
                    method="post"
                    action={`/edit-post/${post.id}`}
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={titleId}
                            className="text-lg font-medium"
                        >
                            Title *
                        </label>
                        <Input
                            id={titleId}
                            type="text"
                            placeholder="My awesome post"
                            autoComplete="off"
                            name="title"
                            defaultValue={post.title}
                            required
                        />
                        {errorMessages.title && (
                            <ErrorText>{errorMessages.title}</ErrorText>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={thumbnailId}
                            className="text-lg font-medium"
                        >
                            Thumbnail URL
                        </label>
                        <Input
                            id={thumbnailId}
                            type="url"
                            placeholder="https://example.com/thumbnail.jpg"
                            autoComplete="off"
                            name="thumbnail"
                            defaultValue={post.thumbnail}
                        />
                        {errorMessages.thumbnail && (
                            <ErrorText>{errorMessages.thumbnail}</ErrorText>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={contentId}
                            className="text-lg font-medium"
                        >
                            Content *
                        </label>
                        <TextEditor
                            id={contentId}
                            textareaName="content"
                            initialValue={post.content}
                        />
                        {errorMessages.content && (
                            <ErrorText>{errorMessages.content}</ErrorText>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <label htmlFor={publishedId}>Publish this post?</label>
                        <input
                            type="checkbox"
                            name="published"
                            defaultChecked={post.published}
                            id={publishedId}
                        />
                    </div>
                    <Button
                        style={{ display: "flex", justifyContent: "center" }}
                        type="submit"
                        disabled={
                            navigation.state === "submitting" ||
                            navigation.state === "loading"
                        }
                    >
                        {navigation.state === "submitting" ||
                        navigation.state === "loading" ? (
                            <Spinner size={24} />
                        ) : (
                            "Save"
                        )}
                    </Button>
                </Form>
            </FormContainer>
        </div>
    );
}
