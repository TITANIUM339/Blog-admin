import { useId } from "react";
import { Form, Link, useActionData } from "react-router";

export default function Signup() {
    const firstNameId = useId();
    const lastNameId = useId();
    const usernameId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();

    const { errors } = useActionData() || {};

    const errorMessages = {};

    errors?.forEach((error) => (errorMessages[error.path] = error.msg));

    return (
        <div className="flex h-full items-center justify-center">
            <div className="grid-rows[min-content_1fr] grid shadow-lg">
                <div className="relative bg-teal-100 pt-6 pr-2 pb-6 pl-2">
                    <h1 className="text-center text-xl font-medium text-teal-900">
                        Sign up
                    </h1>
                    <div className="absolute bottom-0 left-0 grid h-[60%] w-[30%] grid-rows-3">
                        <div className="w-[25%] origin-left animate-[scale_1s_ease-out] bg-teal-200"></div>
                        <div className="w-[50%] origin-left animate-[scale_1s_ease-out] bg-teal-400"></div>
                        <div className="w-full origin-left animate-[scale_1s_ease-out] bg-teal-600"></div>
                    </div>
                    <div className="absolute top-0 right-0 grid h-[60%] w-[30%] grid-rows-3 justify-items-end">
                        <div className="w-full origin-right animate-[scale_1s_ease-out] bg-teal-600"></div>
                        <div className="w-[50%] origin-right animate-[scale_1s_ease-out] bg-teal-400"></div>
                        <div className="w-[25%] origin-right animate-[scale_1s_ease-out] bg-teal-200"></div>
                    </div>
                </div>
                <Form
                    method="post"
                    action="/sign-up"
                    className="flex flex-col gap-2 p-2"
                >
                    <div className="grid grid-cols-2 gap-2">
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
                                className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
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
                                className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
                            />
                            {errorMessages.lastName && (
                                <p className="text-red-600">
                                    {errorMessages.lastName}
                                </p>
                            )}
                        </div>
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
                            className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
                        />
                        {errorMessages.username && (
                            <p className="text-red-600">
                                {errorMessages.username}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
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
                                className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
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
                                className="rounded-md border-1 border-gray-300 p-1 outline-teal-700"
                            />
                            {errorMessages.confirmPassword && (
                                <p className="text-red-600">
                                    {errorMessages.confirmPassword}
                                </p>
                            )}
                        </div>
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
                    <button
                        type="submit"
                        className="rounded-md bg-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-700 transition-colors duration-200 hover:cursor-pointer hover:bg-teal-100"
                    >
                        Sign up
                    </button>
                </Form>
            </div>
        </div>
    );
}
