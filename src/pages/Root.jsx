import { BsGithub } from "react-icons/bs";
import { Form, Link, Outlet, useLoaderData } from "react-router";
import { ToastContainer } from "react-toastify";
import Button from "../components/Button";

export default function Root() {
    const user = useLoaderData();

    return (
        <>
            <div className="grid min-h-screen grid-rows-[min-content_1fr_min-content] bg-gray-50 text-gray-800">
                <header className="bg-teal-800">
                    <div className="mr-auto ml-auto flex max-w-7xl items-center justify-between p-2">
                        <div>
                            <Link
                                to="/"
                                className="text-2xl font-medium text-gray-50"
                            >
                                Blog Admin
                            </Link>
                        </div>
                        <div className="flex gap-2">
                            {user ? (
                                <Form method="post" action="/log-out">
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        style={{
                                            color: "var(--color-gray-50)",
                                        }}
                                    >
                                        Log out
                                    </Button>
                                </Form>
                            ) : (
                                <>
                                    <Button
                                        Component={Link}
                                        to="/log-in"
                                        variant="secondary"
                                        style={{
                                            color: "var(--color-gray-50)",
                                        }}
                                    >
                                        Log in
                                    </Button>
                                    <Button Component={Link} to="/sign-up">
                                        Sign up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <main>
                    <div className="mr-auto ml-auto h-full w-full max-w-7xl p-2">
                        <Outlet />
                    </div>
                </main>
                <footer className="flex items-center justify-center gap-2 p-2">
                    Copyright © TITANIUM339 {new Date().getFullYear()}
                    <Link
                        to="https://github.com/TITANIUM339"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform hover:scale-125"
                    >
                        <BsGithub />
                    </Link>
                </footer>
            </div>
            <ToastContainer />
        </>
    );
}
