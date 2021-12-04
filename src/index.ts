
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

client.loginBot("pdqi_1Nbcw3oux5e67Q9qm0Qm0-efHWPvz2MvPSgKf1TVTvzkWFY3APWuFc6EDV9");