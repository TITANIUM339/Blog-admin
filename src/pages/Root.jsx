import { BsGithub } from "react-icons/bs";
import { Link, Outlet, useLoaderData } from "react-router";
import Button from "../components/Button";

export default function Root() {
    const user = useLoaderData();

    return (
        <div className="grid min-h-screen grid-rows-[min-content_1fr_min-content]">
            <header className="bg-teal-800">
                <div className="mr-auto ml-auto flex max-w-7xl items-center justify-between p-2">
                    <div>
                        <Link
                            to="/"
                            className="text-2xl font-medium text-white"
                        >
                            Blog Admin
                        </Link>
                    </div>
                    <div className="flex gap-2">
                        {user ? (
                            <Button
                                Component={Link}
                                to="/log-out"
                                variant="secondary"
                            >
                                Log out
                            </Button>
                        ) : (
                            <>
                                <Button
                                    Component={Link}
                                    to="/log-in"
                                    variant="secondary"
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
    );
}
