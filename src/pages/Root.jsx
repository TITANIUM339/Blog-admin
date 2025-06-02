import { BsGithub } from "react-icons/bs";
import { Link, Outlet, useLoaderData } from "react-router";

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
                            <Link
                                to="/log-out"
                                className="flex items-center rounded-md border-2 border-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-50"
                            >
                                Log out
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/log-in"
                                    className="flex items-center rounded-md border-2 border-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-50"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="flex items-center rounded-md bg-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-700"
                                >
                                    Sign up
                                </Link>
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
