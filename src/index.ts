
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

// token ?
if (!config.token) {
    console.error("Token no detectado.");
} else {
client.loginBot(config.token);
}