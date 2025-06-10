import { useId } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import Button from "../components/Button";
import HeadingContainer from "../components/HeadingContainer";
import Spinner from "../components/Spinner";

export default function Signup() {
    const firstNameId = useId();
    const lastNameId = useId();
    const usernameId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();

    const { errors } = useActionData() || {};

    const navigation = useNavigation();

    const errorMessages = {};

    errors?.forEach((error) => (errorMessages[error.path] = error.msg));

    return (
        <div className="flex h-full items-center justify-center">
            <div className="grid-rows[min-content_1fr] grid w-full max-w-md shadow-lg">
                <HeadingContainer>
                    <div className="pt-6 pr-2 pb-6 pl-2">
                        <h1 className="text-center text-xl font-medium text-teal-900">
                            Sign up
                        </h1>
                    </div>
                </HeadingContainer>
                <Form
                    method="post"
                    action="/sign-up"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={firstNameId}
                            className="text-lg font-medium"
                        >
                            First name *
                        </label>
                        <input
                            id={firstNameId}
                            type="text"
                            placeholder="John"
                            autoComplete="given-name"
                            autoCapitalize="on"
                            name="firstName"
                            required
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.firstName && (
                            <p className="text-red-600">
                                {errorMessages.firstName}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={lastNameId}
                            className="text-lg font-medium"
                        >
                            Last name *
                        </label>
                        <input
                            id={lastNameId}
                            type="text"
                            placeholder="Smith"
                            autoComplete="family-name"
                            autoCapitalize="on"
                            name="lastName"
                            required
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.lastName && (
                            <p className="text-red-600">
                                {errorMessages.lastName}
                            </p>
                        )}
                    </div>
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
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.username && (
                            <p className="text-red-600">
                                {errorMessages.username}
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
                            autoComplete="new-password"
                            name="password"
                            required
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.password && (
                            <p className="text-red-600">
                                {errorMessages.password}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor={confirmPasswordId}
                            className="text-lg font-medium"
                        >
                            Confirm password *
                        </label>
                        <input
                            id={confirmPasswordId}
                            type="password"
                            placeholder="********"
                            autoComplete="new-password"
                            name="confirmPassword"
                            required
                            className="rounded-md border border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.confirmPassword && (
                            <p className="text-red-600">
                                {errorMessages.confirmPassword}
                            </p>
                        )}
                    </div>
                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            to="/log-in"
                            className="font-medium text-teal-700 hover:underline"
                        >
                            Log in
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
                            "Sign up"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
