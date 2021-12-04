import { Route } from '../api/routes';
import { Client } from '../Client';
export default class Bots {
    client: Client;
    constructor(client: Client);
    /**
     * Fetch a bot
     * @param id Bot ID
     * @returns Bot and User object
     */
    fetch(id: string): Promise<{
        bot: import("revolt-api/types/Bots").Bot;
        user: import("./Users").User;
    }>;
    /**
     * Delete a bot
     * @param id Bot ID
     */
    delete(id: string): Promise<void>;
    /**
     * Fetch a public bot
     * @param id Bot ID
     * @returns Public Bot object
     */
    fetchPublic(id: string): Promise<import("revolt-api/types/Bots").PublicBot>;
    /**
     * Invite a public bot
     * @param id Bot ID
     * @param destination The group or server to add to
     */
    invite(id: string, destination: Route<'POST', '/bots/id/invite'>["data"]): Promise<undefined>;
    /**
     * Fetch a bot
     * @param id Bot ID
     * @returns Bot and User objects
     */
    fetchOwned(): Promise<{
        bots: import("revolt-api/types/Bots").Bot[];
        users: import("./Users").User[];
    }>;
    /**
     * Edit a bot
     * @param id Bot ID
     * @param data Bot edit data object
     */
    edit(id: string, data: Route<'PATCH', '/bots/id'>["data"]): Promise<void>;
    /**
     * Create a bot
     * @param data Bot creation data
     */
    create(data: Route<'POST', '/bots/create'>["data"]): Promise<{
        bot: import("revolt-api/types/Bots").Bot;
        user: import("./Users").User;
    }>;
}
