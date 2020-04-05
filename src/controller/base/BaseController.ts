import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {BaseInterface} from "./BaseInterface";

export abstract class BaseController implements BaseInterface {
    private readonly webClient: WebClient;
    private _text: string;

    constructor(webClient: WebClient) {
        this.webClient = webClient;
        this._text = "";
    }

    get text(): string {
        return this._text;
    }

    abstract prepare(): Promise<void>;

    abstract makePayload(): Promise<ChatPostMessageArguments>;

    async sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void> {
        if (!payload) {
            return;
        }
        await this.webClient.chat.postMessage(payload);
    }

    setText(text: string): void {
        this._text = text;
    }
}