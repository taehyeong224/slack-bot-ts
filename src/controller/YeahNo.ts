import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";

export class YeahNo extends BaseController {
    async makePayload(): Promise<ChatPostMessageArguments> {
        const yeahNo = `응, 아니야`;
        return {channel: channels.general, text: yeahNo, icon_emoji: ":smiling_imp:"};
    }

    async prepare(): Promise<void> {
    }

}