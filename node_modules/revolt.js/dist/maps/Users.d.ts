import type { BotInformation, Status, User as UserI } from 'revolt-api/types/Users';
import type { RemoveUserField, Route } from '../api/routes';
import type { Attachment } from 'revolt-api/types/Autumn';
import { Nullable } from '../util/null';
import Collection from './Collection';
import { Client, FileArgs } from '..';
declare enum RelationshipStatus {
    None = "None",
    User = "User",
    Friend = "Friend",
    Outgoing = "Outgoing",
    Incoming = "Incoming",
    Blocked = "Blocked",
    BlockedOther = "BlockedOther"
}
export declare class User {
    client: Client;
    _id: string;
    username: string;
    avatar: Nullable<Attachment>;
    badges: Nullable<number>;
    status: Nullable<Status>;
    relationship: Nullable<RelationshipStatus>;
    online: Nullable<boolean>;
    flags: Nullable<number>;
    bot: Nullable<BotInformation>;
    constructor(client: Client, data: UserI);
    update(data: Partial<UserI>, clear?: RemoveUserField): void;
    /**
     * Open a DM with a user
     * @returns DM Channel
     */
    openDM(): Promise<import("./Channels").Channel>;
    /**
     * Send a friend request to a user
     */
    addFriend(): Promise<void>;
    /**
     * Remove a user from the friend list
     */
    removeFriend(): Promise<void>;
    /**
     * Block a user
     */
    blockUser(): Promise<void>;
    /**
     * Unblock a user
     */
    unblockUser(): Promise<void>;
    /**
     * Fetch the profile of a user
     * @returns The profile of the user
     */
    fetchProfile(): Promise<import("revolt-api/types/Users").Profile>;
    /**
     * Fetch the mutual connections of the current user and a target user
     * @returns The mutual connections of the current user and a target user
     */
    fetchMutual(): Promise<{
        users: string[];
        servers: string[];
    }>;
    /**
     * Get the default avatar URL of a user
     */
    get defaultAvatarURL(): string;
    generateAvatarURL(...args: FileArgs): string;
    get permission(): number;
}
export default class Users extends Collection<string, User> {
    constructor(client: Client);
    $get(id: string, data?: UserI): User;
    /**
     * Fetch a user
     * @param id User ID
     * @returns User
     */
    fetch(id: string, data?: UserI): Promise<User>;
    /**
     * Create a user object.
     * This is meant for internal use only.
     * @param data: User Data
     * @returns User
     */
    createObj(data: UserI): User;
    /**
     * Edit the current user
     * @param data User edit data object
     */
    edit(data: Route<'PATCH', '/users/id'>["data"]): Promise<void>;
    /**
     * Change the username of the current user
     * @param username New username
     * @param password Current password
     */
    changeUsername(username: string, password: string): Promise<undefined>;
}
export {};
