import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {channels} from "../../config/token";
import {BaseCron} from "./base/BaseCron";

export class ChallengeCoding extends BaseCron {
    constructor(webClient: WebClient) {
        super(webClient, "0 22 * * 1-5"); // 매일 밤 10시 월~금
    }

    public async makePayload(): Promise<ChatPostMessageArguments | void> {
        return {channel: channels.challenge, text: `제출한 코드를 깃허브에 올리시고 그 주소를 쓰레드에 달아주세요`, icon_emoji: ":shipit:"};
    }
}