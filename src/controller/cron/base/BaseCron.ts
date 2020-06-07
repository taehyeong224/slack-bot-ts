import {BaseCronInterface} from "./BaseCronInterface";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {schedule, ScheduledTask, validate} from "node-cron";
import {channels} from "../../../config/token";

export abstract class BaseCron implements BaseCronInterface {
    private readonly webClient: WebClient;
    protected rule: string;
    protected task: ScheduledTask | undefined;

    protected constructor(webClient: WebClient, rule: string) {
        this.webClient = webClient;
        this.rule = rule;
    }

    abstract makePayload(): Promise<ChatPostMessageArguments|void>;

    public async sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void> {
        if (!payload) {
            return;
        }
        await this.webClient.chat.postMessage(payload);
    }

    public runCronJob(): void {
        this.task = schedule(this.rule, async () => {
            const payload = await this.makePayload();
            if (payload !== undefined) {
                await this.sendToSlack(payload);
            }
        })
    }

    public async changeCron(pattern: string): Promise<void> {
        if (!validate(pattern)) {
            await this.sendToSlack({channel: channels.general, text: `crontab 패턴에 맞지 않아요~`, icon_emoji: ":shipit:"});
            return;
        }
        this.task?.destroy();
        this.rule = pattern;
        this.runCronJob();
    }
}