import { Link, useRouteError } from "react-router";
import Button from "../components/Button";

export default function Error() {
    const error = useRouteError();

    return (
        <div className="flex h-screen items-center justify-center">
            <section className="flex flex-col items-center gap-4">
                <h1 className="text-3xl font-medium">
                    <span className="text-teal-700">{error.status}:</span>{" "}
                    {error.statusText}
                </h1>
                <Button Component={Link} to="/" replace>
                    Go back home
                </Button>
            </section>
        </div>
    );
}
