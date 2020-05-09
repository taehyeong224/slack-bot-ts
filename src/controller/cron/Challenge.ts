import {schedule} from "node-cron";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {channels} from "../../config/token";
import {BaseCron} from "./base/BaseCron";

export class Challenge extends BaseCron {
    private readonly rule: string = "0 10-18 * * 1-5"; // 월-금 10시-18 시 매 시간 마다
    // private readonly rule: string = "* * * * *"; // 1분 마다

    constructor(webClient: WebClient) {
        super(webClient);
    }

    public async makePayload(): Promise<ChatPostMessageArguments> {
        return {channel: channels.challenge, text: "쓰레드로 출첵을 해주세요 혹은 인증을 해주세요", icon_emoji: ":shipit:"};
    }

    public runCronJob(): void {
        schedule(this.rule, async () => {
            const payload = await this.makePayload();
            await this.sendToSlack(payload);
        })
    }
}