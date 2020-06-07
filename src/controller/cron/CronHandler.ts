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
    public findControllerByName(name: string): BaseCronInterface | null {
        const filtered: BaseCronInterface[] = this.controllerList.filter(item => item.constructor.name === name);
        return filtered.length === 0 ? null : filtered[0];
    }
}