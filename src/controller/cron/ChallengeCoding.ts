import {schedule} from "node-cron";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {channels} from "../../config/token";
import {BaseCron} from "./base/BaseCron";

export class ChallengeCoding extends BaseCron {
    private readonly rule: string = "0 22 * * *"; // 매일 밤 10시

    constructor(webClient: WebClient) {
        super(webClient);
    }

    public async makePayload(): Promise<ChatPostMessageArguments | void> {
        return {channel: channels.challenge, text: `제출한 코드를 깃허브에 올리시고 그 주소를 쓰레드에 달아주세요`, icon_emoji: ":shipit:"};
    }

    public runCronJob(): void {
        schedule(this.rule, async () => {
            const payload = await this.makePayload();
            if (payload !== undefined) {
                await this.sendToSlack(payload);
            }
        })
    }
}