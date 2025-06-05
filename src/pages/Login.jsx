import { useId } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import Button from "../components/Button";
import HeadingContainer from "../components/HeadingContainer";
import Spinner from "../components/Spinner";

export default function Login() {
    const usernameId = useId();
    const passwordId = useId();

    const error = useActionData();

    const navigation = useNavigation();

    return (
        <div className="flex h-full items-center justify-center">
            <div className="grid-rows[min-content_1fr] grid w-full max-w-md shadow-lg">
                <HeadingContainer>
                    <div className="pt-6 pr-2 pb-6 pl-2">
                        <h1 className="text-center text-xl font-medium text-teal-900">
                            Log in
                        </h1>
                    </div>
                </HeadingContainer>
                <Form
                    method="post"
                    action="/log-in"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={usernameId}
                            className="text-lg font-medium"
                        >
                            Username *
                        </label>
                        <input
                            id={usernameId}
                            type="text"
                            placeholder="john"
                            autoComplete="username"
                            name="username"
                            required
                            className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
                        />
                        {error && (
                            <p className="text-red-600">
                                incorrect username or password
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={passwordId}
                            className="text-lg font-medium"
                        >
                            password *
                        </label>
                        <input
                            id={passwordId}
                            type="password"
                            placeholder="********"
                            autoComplete="current-password"
                            name="password"
                            required
                            className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
                        />
                        {error && (
                            <p className="text-red-600">
                                incorrect username or password
                            </p>
                        )}
                    </div>
                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/sign-up"
                            className="font-medium text-teal-700 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    <Button
                        className="flex justify-center"
                        type="submit"
                        disabled={navigation.state === "submitting"}
                    >
                        {navigation.state === "submitting" ? (
                            <Spinner size={24} />
                        ) : (
                            "Log in"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
