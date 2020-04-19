import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {BaseController} from "./base/BaseController";
import {Dust} from "./Dust";
import {Tracker} from "./Tracker";

export class Handler {
    private readonly controllerList: BaseController[];

    constructor(bansa: Bansa, restaurant: Restaurant, dust: Dust, tracker: Tracker) {
        this.controllerList = [bansa, restaurant, dust, tracker];
    }

    public async checkAndExecute(text: string): Promise<void> {
        for (const controller of this.controllerList) {
            controller.text = text;
            if (controller.checkCondition()) {
                await controller.processing();
            }
        }
    }
}