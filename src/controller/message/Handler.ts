import {BaseController} from "./base/BaseController";

export class Handler {
    private readonly controllerList: BaseController[];

    constructor(list: BaseController[]) {
        this.controllerList = list;
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