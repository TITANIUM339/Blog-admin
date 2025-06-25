import { Link, useRouteError } from "react-router";
import Button from "../components/Button";

export default function Error() {
    const error = useRouteError();

    console.error(error);

    return (
        <div className="flex h-screen items-center justify-center">
            <section className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-3xl font-medium">
                    {error.status ? (
                        <>
                            <span className="text-teal-700">
                                {error.status}:
                            </span>{" "}
                            {error.statusText}
                        </>
                    ) : (
                        "An unexpected error occurred"
                    )}
                </h1>
                <Button Component={Link} to="/" replace>
                    Go back home
                </Button>
            </section>
        </div>
    );
}
