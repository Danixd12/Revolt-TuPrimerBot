"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mobx_1 = require("mobx");
const lodash_isequal_1 = __importDefault(require("lodash.isequal"));
const permissions_1 = require("../api/permissions");
const null_1 = require("../util/null");
const Collection_1 = __importDefault(require("./Collection"));
var RelationshipStatus;
(function (RelationshipStatus) {
    RelationshipStatus["None"] = "None";
    RelationshipStatus["User"] = "User";
    RelationshipStatus["Friend"] = "Friend";
    RelationshipStatus["Outgoing"] = "Outgoing";
    RelationshipStatus["Incoming"] = "Incoming";
    RelationshipStatus["Blocked"] = "Blocked";
    RelationshipStatus["BlockedOther"] = "BlockedOther";
})(RelationshipStatus || (RelationshipStatus = {}));
class User {
    constructor(client, data) {
        this.client = client;
        this._id = data._id;
        this.username = data.username;
        this.avatar = null_1.toNullable(data.avatar);
        this.badges = null_1.toNullable(data.badges);
        this.status = null_1.toNullable(data.status);
        this.relationship = null_1.toNullable(data.relationship);
        this.online = null_1.toNullable(data.online);
        this.flags = null_1.toNullable(data.flags);
        this.bot = null_1.toNullable(data.bot);
        mobx_1.makeAutoObservable(this, {
            _id: false,
            client: false,
        });
    }
    update(data, clear) {
        const apply = (key) => {
            // This code has been tested.
            // @ts-expect-error
            if (typeof data[key] !== 'undefined' && !lodash_isequal_1.default(this[key], data[key])) {
                // @ts-expect-error
                this[key] = data[key];
                if (key === 'relationship') {
                    this.client.emit('user/relationship', this);
                }
            }
        };
        switch (clear) {
            case "Avatar":
                this.avatar = null;
                break;
            case "StatusText": {
                if (this.status) {
                    this.status.text = undefined;
                }
            }
        }
        apply("username");
        apply("avatar");
        apply("badges");
        apply("status");
        apply("relationship");
        apply("online");
        apply("flags");
        apply("bot");
    }
    /**
     * Open a DM with a user
     * @returns DM Channel
     */
    openDM() {
        return __awaiter(this, void 0, void 0, function* () {
            const dm = yield this.client.req('GET', `/users/${this._id}/dm`);
            return (yield this.client.channels.fetch(dm._id, dm));
        });
    }
    /**
     * Send a friend request to a user
     */
    addFriend() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.req('PUT', `/users/${this.username}/friend`);
        });
    }
    /**
     * Remove a user from the friend list
     */
    removeFriend() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.req('DELETE', `/users/${this._id}/friend`);
        });
    }
    /**
     * Block a user
     */
    blockUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.req('PUT', `/users/${this._id}/block`);
        });
    }
    /**
     * Unblock a user
     */
    unblockUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.req('DELETE', `/users/${this._id}/block`);
        });
    }
    /**
     * Fetch the profile of a user
     * @returns The profile of the user
     */
    fetchProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.req('GET', `/users/${this._id}/profile`);
        });
    }
    /**
     * Fetch the mutual connections of the current user and a target user
     * @returns The mutual connections of the current user and a target user
     */
    fetchMutual() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.req('GET', `/users/${this._id}/mutual`);
        });
    }
    /**
     * Get the default avatar URL of a user
     */
    get defaultAvatarURL() {
        return `${this.client.apiURL}/users/${this._id}/default_avatar`;
    }
    generateAvatarURL(...args) {
        var _a, _b;
        return (_b = this.client.generateFileURL((_a = this.avatar) !== null && _a !== void 0 ? _a : undefined, ...args)) !== null && _b !== void 0 ? _b : this.defaultAvatarURL;
    }
    get permission() {
        let permissions = 0;
        switch (this.relationship) {
            case RelationshipStatus.Friend:
            case RelationshipStatus.User:
                return permissions_1.U32_MAX;
            case RelationshipStatus.Blocked:
            case RelationshipStatus.BlockedOther:
                return permissions_1.UserPermission.Access;
            case RelationshipStatus.Incoming:
            case RelationshipStatus.Outgoing:
                permissions = permissions_1.UserPermission.Access;
        }
        if ([...this.client.channels.values()].find(channel => {
            var _a;
            return (channel.channel_type === 'Group' || channel.channel_type === 'DirectMessage')
                && ((_a = channel.recipient_ids) === null || _a === void 0 ? void 0 : _a.includes(this.client.user._id));
        }) || [...this.client.members.values()].find(member => member._id.user === this.client.user._id)) {
            permissions |= permissions_1.UserPermission.Access | permissions_1.UserPermission.ViewProfile;
        }
        return permissions;
    }
}
__decorate([
    mobx_1.action
], User.prototype, "update", null);
__decorate([
    mobx_1.computed
], User.prototype, "generateAvatarURL", null);
__decorate([
    mobx_1.computed
], User.prototype, "permission", null);
exports.User = User;
class Users extends Collection_1.default {
    constructor(client) {
        super(client);
        this.createObj = this.createObj.bind(this);
        this.set('00000000000000000000000000', new User(client, {
            _id: '00000000000000000000000000',
            username: 'Revolt'
        }));
    }
    $get(id, data) {
        let user = this.get(id);
        if (data)
            user.update(data);
        return user;
    }
    /**
     * Fetch a user
     * @param id User ID
     * @returns User
     */
    fetch(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.has(id))
                return this.$get(id, data);
            let res = data !== null && data !== void 0 ? data : yield this.client.req('GET', `/users/${id}`);
            return this.createObj(res);
        });
    }
    /**
     * Create a user object.
     * This is meant for internal use only.
     * @param data: User Data
     * @returns User
     */
    createObj(data) {
        if (this.has(data._id))
            return this.$get(data._id, data);
        let user = new User(this.client, data);
        mobx_1.runInAction(() => {
            this.set(data._id, user);
        });
        this.client.emit('user/relationship', user);
        return user;
    }
    /**
     * Edit the current user
     * @param data User edit data object
     */
    edit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.req('PATCH', '/users/id', data);
        });
    }
    /**
     * Change the username of the current user
     * @param username New username
     * @param password Current password
     */
    changeUsername(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.req('PATCH', '/users/id/username', { username, password });
        });
    }
}
__decorate([
    mobx_1.action
], Users.prototype, "$get", null);
exports.default = Users;
