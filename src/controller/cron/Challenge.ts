import {schedule} from "node-cron";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {channels} from "../../config/token";
import {BaseCron} from "./base/BaseCron";
import dayjs, {Dayjs} from "dayjs";

export class Challenge extends BaseCron {
    // private readonly rule: string = "0 10-18 * * 1-5"; // 월-금 10시-18 시 매 시간 마다
    private readonly rule: string = "* * * * *"; // 1분 마다

    constructor(webClient: WebClient) {
        super(webClient);
    }

    public async makePayload(): Promise<ChatPostMessageArguments | void> {
        const now: Dayjs = dayjs();
        const hour: number = now.hour();
        console.log(hour)
        if (hour === 10 || hour === 2) {
            return {channel: channels.challenge, text: `쓰레드로 출첵을 해주세요 혹은 인증을 해주세요. ${hour === 2 ? '2시 30분 까지 해주세요.' : '10분 이내에 해주세요.'}`, icon_emoji: ":shipit:"};
        }
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