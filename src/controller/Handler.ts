import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {BaseController} from "./base/BaseController";

export class Handler {
    private readonly controllerList: BaseController[];

    constructor(bansa: Bansa, restaurant: Restaurant) {
        this.controllerList = [bansa, restaurant];
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