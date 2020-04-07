import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {ChatPostMessageArguments} from "@slack/web-api";
import {BaseController} from "./base/BaseController";

export class Handler {
    private readonly bansa: Bansa;
    private readonly restaurant: Restaurant;

    constructor(bansa: Bansa, restaurant: Restaurant) {
        this.bansa = bansa;
        this.restaurant = restaurant;
    }

    public async checkAndExecute(text: string): Promise<void> {
        const condition: BaseController | null = this.checkCondition(text);
        if (!condition) {
            return;
        }
        condition.text = text;
        await condition.prepare();
        const payload: ChatPostMessageArguments | undefined = await condition.makePayload();
        await condition.sendToSlack(payload);
    }

    private checkCondition(text: string): BaseController | null {
        if (text === "바보") {
            return this.bansa;
        }

        if (text.startsWith("맛집")) {
            return this.restaurant;
        }

        return null;
    }
}