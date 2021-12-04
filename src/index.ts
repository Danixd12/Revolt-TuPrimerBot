
import { Client } from "revolt.js";
import { connect } from "tls";
import { config } from "./config";
import { BotFramework } from "./modules/framework";

class TuFramework extends Client {
    framework: BotFramework;

    constructor(...args: undefined[]) {
        super(...args);
        this.framework = new BotFramework(this, config.developers, config.prefix);
    }
}
let client = new TuFramework();

client.loginBot("TOKEN DE TU BOT");