import {WebClient} from "@slack/web-api";
import {RTMClient} from "@slack/rtm-api";
import {token} from "./config/token";
import {Handler} from "./controller/Handler";
import * as Controllers from "./controller";
import {BaseController} from "./controller/base/BaseController";

const rtm = new RTMClient(token || "");
const web = new WebClient(token);

const list: BaseController[] = [];
Object.keys(Controllers).map((key: string) => {
    list.push(new Controllers[key](web))
})

const handler: Handler = new Handler(list);

rtm.start().then(() => {
    console.log("start");
}).catch(console.error);

rtm.on('ready', () => {
    console.log("rtm ready");
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


