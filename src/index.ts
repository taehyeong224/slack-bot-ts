import {WebClient} from "@slack/web-api";
import {RTMClient} from "@slack/rtm-api";
import { token, channels } from "./config/token";
const rtm = new RTMClient(token || "");
const web = new WebClient(token);
rtm.start().then(() => {
    console.log("start")
    rtm.on('ready', () => {
        console.log("rtm ready");
        rtm.on('message', async (message: {subtype?: string, text: string}) => {
            const {subtype, text} = message;
            if (subtype !== undefined && subtype === 'bot_message') {
                return;
            }
        
            if (text === "바보") {
                const payload = {channel: channels.general, text: "반사", icon_emoji: ":raised_hand_with_fingers_splayed:"};
                web.chat.postMessage(payload);
            }

            if (text.startsWith("맛집")) {
                const splited: string[] = text.split(" ");
                splited.splice(0, 1);
                const query = encodeURIComponent(`${splited.join(" ")} 맛집`)
                const payload = {channel: channels.general, text: `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${query}`, icon_emoji: ":ice_cream:"};
                web.chat.postMessage(payload);
            }
        });
    });
    
}).catch(console.error);


