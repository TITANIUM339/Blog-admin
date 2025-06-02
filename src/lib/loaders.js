import { getUser } from "./queries";

export function root(client) {
    return async () => await client.ensureQueryData(getUser);
}
