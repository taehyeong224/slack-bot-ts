import {BaseCronInterface} from "./base/BaseCronInterface";

export class CronHandler {
    private readonly controllerList: BaseCronInterface[];

    constructor(list: BaseCronInterface[]) {
        this.controllerList = list;
    }

    public execute(): void {
        for (const controller of this.controllerList) {
            controller.runCronJob();
        }
    }
}