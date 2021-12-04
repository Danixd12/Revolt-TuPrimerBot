import type { Message as MessageI, SystemMessage } from 'revolt-api/types/Channels';
import type { Attachment } from 'revolt-api/types/Autumn';
import type { Embed } from 'revolt-api/types/January';
import type { Route } from '../api/routes';
import { Nullable } from '../util/null';
import Collection from './Collection';
import { Client } from "..";
export declare class Message {
    client: Client;
    _id: string;
    nonce?: string;
    channel_id: string;
    author_id: string;
    content: string | SystemMessage;
    attachments: Nullable<Attachment[]>;
    edited: Nullable<Date>;
    embeds: Nullable<Embed[]>;
    mention_ids: Nullable<string[]>;
    reply_ids: Nullable<string[]>;
    get channel(): import("./Channels").Channel | undefined;
    get author(): import("./Users").User | undefined;
    get member(): import("./Members").Member | undefined;
    get mentions(): (import("./Users").User | undefined)[] | undefined;
    get asSystemMessage(): {
        type: string;
        content: string;
        user?: undefined;
        by?: undefined;
        name?: undefined;
    } | {
        type: "text" | "user_added" | "user_remove" | "user_joined" | "user_left" | "user_kicked" | "user_banned" | "channel_renamed" | "channel_description_changed" | "channel_icon_changed";
        user: import("./Users").User | undefined;
        by: import("./Users").User | undefined;
        content?: undefined;
        name?: undefined;
    } | {
        type: "text" | "user_added" | "user_remove" | "user_joined" | "user_left" | "user_kicked" | "user_banned" | "channel_renamed" | "channel_description_changed" | "channel_icon_changed";
        user: import("./Users").User | undefined;
        content?: undefined;
        by?: undefined;
        name?: undefined;
    } | {
        type: "text" | "user_added" | "user_remove" | "user_joined" | "user_left" | "user_kicked" | "user_banned" | "channel_renamed" | "channel_description_changed" | "channel_icon_changed";
        name: string;
        by: import("./Users").User | undefined;
        content?: undefined;
        user?: undefined;
    } | {
        type: "text" | "user_added" | "user_remove" | "user_joined" | "user_left" | "user_kicked" | "user_banned" | "channel_renamed" | "channel_description_changed" | "channel_icon_changed";
        by: import("./Users").User | undefined;
        content?: undefined;
        user?: undefined;
        name?: undefined;
    };
    constructor(client: Client, data: MessageI);
    update(data: Partial<MessageI>): void;
    /**
     * Edit a message
     * @param data Message edit route data
     */
    edit(data: Route<'PATCH', '/channels/id/messages/id'>["data"]): Promise<undefined>;
    /**
     * Delete a message
     */
    delete(): Promise<undefined>;
    /**
     * Acknowledge this message as read
     */
    ack(): void;
    /**
     * Reply to Message
     */
    reply(data: string | (Omit<Route<'POST', '/channels/id/messages'>["data"], 'nonce'> & {
        nonce?: string;
    }), mention?: boolean): Promise<Message> | undefined;
}
export default class Messages extends Collection<string, Message> {
    constructor(client: Client);
    $get(id: string, data?: MessageI): Message;
    /**
     * Create a message object.
     * This is meant for internal use only.
     * @param data Message Data
     * @param emit Whether to emit creation event
     * @returns Message
     */
    createObj(data: MessageI, emit?: boolean | number): Message;
}
