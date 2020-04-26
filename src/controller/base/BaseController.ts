import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {BaseInterface} from "./BaseInterface";
import {channels} from "../../config/token";

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


    set text(value: string) {
        this._text = value;
    }

    abstract async prepare(): Promise<void>;

    abstract makePayload(): Promise<ChatPostMessageArguments>;

    async sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void> {
        if (!payload) {
            return;
        }
        await this.webClient.chat.postMessage(payload);
    }

    abstract checkCondition(): boolean;

    public async processing(): Promise<void> {
        try {
            await this.prepare();
            const payload: ChatPostMessageArguments = await this.makePayload();
            await this.sendToSlack(payload);
        } catch (e) {
            console.error(e)
            await this.sendToSlack({channel: channels.general, text: `
에러 발생~!
${e.message}
${e}
`, icon_emoji: ":woman-facepalming:"})
        }
    }
}
