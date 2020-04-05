import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {BaseInterface} from "./base/BaseInterface";
import {ChatPostMessageArguments} from "@slack/web-api";

export class Handler {
    private readonly bansa: Bansa;
    private readonly restaurant: Restaurant;

    constructor(bansa: Bansa, restaurant: Restaurant) {
        this.bansa = bansa;
        this.restaurant = restaurant;
    }

    public async checkAndExecute(text: string): Promise<void> {
        const condition: BaseInterface | null = this.checkCondition(text);
        condition?.setText(text);
        await condition?.prepare();
        const payload: ChatPostMessageArguments | undefined = await condition?.makePayload();
        await condition?.sendToSlack(payload);
    }

    private checkCondition(text: string): BaseInterface | null {
        if (text === "바보") {
            return this.bansa;
        }

        if (text.startsWith("맛집")) {
            return this.restaurant;
        }

        return null;
    }
}