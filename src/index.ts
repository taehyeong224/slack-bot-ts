import {WebClient} from "@slack/web-api";
import {RTMClient} from "@slack/rtm-api";
import {token} from "./config/token";
import {Handler} from "./controller/Handler";
import {Bansa} from "./controller/Bansa";
import {Restaurant} from "./controller/Restaurant";
import {Dust} from "./controller/Dust";
import {YeahNo} from "./controller/YeahNo";
import {PickCoffee} from "./controller/PickCoffee";
import {ServerStatus} from "./controller/ServerStatus";

const rtm = new RTMClient(token || "");
const web = new WebClient(token);
const handler: Handler = new Handler(new Bansa(web), new Restaurant(web), new Dust(web), new YeahNo(web), new PickCoffee(web), new ServerStatus(web));

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


