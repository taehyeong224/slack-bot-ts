import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {channels} from "../../config/token";
import {BaseCron} from "./base/BaseCron";
import dayjs, {Dayjs} from "dayjs";

export class Challenge extends BaseCron {
    constructor(webClient: WebClient) {
        super(webClient, "0 8-18 * * 1-5"); // 월-금 10시-18 시 매 시간 마다
    }

    public async makePayload(): Promise<ChatPostMessageArguments | void> {
        const now: Dayjs = dayjs();
        const hour: number = now.hour();
        console.log(hour)
        if (hour === 8) {
            return {channel: channels.challenge, text: `쓰레드로 출첵을 해주세요 혹은 인증을 해주세요. 미리하는 출첵이니 안심하세요ㅋ`, icon_emoji: ":shipit:"};
        }
        if (hour === 10 || hour === 14) {
            return {channel: channels.challenge, text: `쓰레드로 출첵을 해주세요 혹은 인증을 해주세요. ${hour === 14 ? '2시 30분 까지 해주세요.' : '10분 이내에 해주세요.'}`, icon_emoji: ":shipit:"};
        }
    }
}
