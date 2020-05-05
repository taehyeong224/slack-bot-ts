import {BaseCronInterface} from "./BaseCronInterface";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";

export abstract class BaseCron implements BaseCronInterface {
    private readonly webClient: WebClient;

    protected constructor(webClient: WebClient) {
        this.webClient = webClient;
    }

    abstract makePayload(): Promise<ChatPostMessageArguments>;

    public async sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void> {
        if (!payload) {
            return;
        }
        await this.webClient.chat.postMessage(payload);
    }

    abstract runCronJob(): void
}