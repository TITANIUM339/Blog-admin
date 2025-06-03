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
                                className="rounded-md pt-1 pr-3 pb-1 pl-3 font-medium text-white transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)]"
                            >
                                Log out
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/log-in"
                                    className="rounded-md pt-1 pr-3 pb-1 pl-3 font-medium text-white transition-colors duration-200 hover:bg-[rgba(0,0,0,0.1)]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/sign-up"
                                    className="rounded-md bg-teal-50 pt-1 pr-3 pb-1 pl-3 font-medium text-teal-700 transition-colors duration-200 hover:bg-teal-100"
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
