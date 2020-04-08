import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";

export class Bansa extends BaseController {
    public async makePayload(): Promise<ChatPostMessageArguments> {
        const bansa = `
반사
반사
반사
반사
반사
반사
반사
`;
        return {channel: channels.general, text: bansa, icon_emoji: ":raised_hand_with_fingers_splayed:"};
    }

    public async prepare(): Promise<void> {
    }

    public checkCondition(): boolean {
        return this.text === "바보";
    }

}