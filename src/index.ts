import {WebClient} from "@slack/web-api";
import {RTMClient} from "@slack/rtm-api";
import {token} from "./config/token";
import {Handler} from "./controller/message/Handler";
import {CronHandler} from "./controller/cron/CronHandler";
import * as Controllers from "./controller/message";
import * as Crons from "./controller/cron";

const rtm = new RTMClient(token || "");
const web = new WebClient(token);

const handler: Handler = new Handler(Object.keys(Controllers).map(key => new Controllers[key](web)));
const cronHandler: CronHandler = new CronHandler(Object.keys(Crons).map(key => new Crons[key](web)));

rtm.start().then(() => {
    console.log("start");
}).catch(console.error);

rtm.on('ready', () => {
    console.log("rtm ready");
    cronHandler.execute();
});
rtm.on('message', async (message: { subtype?: string, text: string }) => {
    const {subtype, text} = message;
    if (!text) {
        return;
    }
    if (subtype !== undefined && subtype === 'bot_message') {
        return;
    }
    await handler.checkAndExecute(text);
});


