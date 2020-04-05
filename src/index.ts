import {WebClient} from "@slack/web-api";
import {RTMClient} from "@slack/rtm-api";
import {token, channels} from "./config/token";

const rtm = new RTMClient(token || "");
const web = new WebClient(token);
rtm.start().then(() => {
    console.log("start");
}).catch(console.error);

rtm.on('ready', () => {
    console.log("rtm ready");
});
rtm.on('message', async (message: { subtype?: string, text: string }) => {
    const {subtype, text} = message;
    console.log("text : ", text, typeof text)
    if (!text) {
        return;
    }
    if (subtype !== undefined && subtype === 'bot_message') {
        return;
    }


    if (text === "바보") {
        const bansa = `
반사
반사
반사
반사
반사
반사
반사
            `


        const payload = {channel: channels.general, text: bansa, icon_emoji: ":raised_hand_with_fingers_splayed:"};
        return web.chat.postMessage(payload);
    }

    if (text.startsWith("맛집")) {
        const splited: string[] = text.split(" ");
        splited.splice(0, 1);
        const query = encodeURIComponent(`${splited.join(" ")} 맛집`)
        const payload = {
            channel: channels.general,
            text: `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${query}`,
            icon_emoji: ":ice_cream:"
        };
        return web.chat.postMessage(payload);
    }
    return
});


