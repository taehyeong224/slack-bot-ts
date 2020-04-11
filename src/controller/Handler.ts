import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {ChatPostMessageArguments} from "@slack/web-api";
import {BaseController} from "./base/BaseController";
import {YeahNo} from "./YeahNo";

export class Handler {
    private readonly controllerList: BaseController[];

    constructor(bansa: Bansa, restaurant: Restaurant, yeahNo: YeahNo) {
        this.controllerList = [bansa, restaurant, yeahNo];
    }

    public async checkAndExecute(text: string): Promise<void> {
        for (const controller of this.controllerList) {
            controller.text = text;
            if (controller.checkCondition()) {
                await controller.prepare();
                const payload: ChatPostMessageArguments = await controller.makePayload();
                await controller.sendToSlack(payload);
            }
        }
    }
}