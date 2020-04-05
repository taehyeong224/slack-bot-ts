import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";

export class Restaurant extends BaseController {
    async makePayload(): Promise<ChatPostMessageArguments> {
        const splited: string[] = this.text.split(" ");
        splited.splice(0, 1);
        const query = encodeURIComponent(`${splited.join(" ")} 맛집`);
        return {
            channel: channels.general,
            text: `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${query}`,
            icon_emoji: ":ice_cream:"
        };
    }

    async prepare(): Promise<void> {
    }

}