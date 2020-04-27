import {Bansa} from "./Bansa";
import {Restaurant} from "./Restaurant";
import {BaseController} from "./base/BaseController";
import {YeahNo} from "./YeahNo";
import {Dust} from "./Dust";
import {PickCoffee} from "./PickCoffee";
import {ServerStatus} from "./ServerStatus";

export class Handler {
    private readonly controllerList: BaseController[];

    constructor(bansa: Bansa, restaurant: Restaurant, dust: Dust, yeahNo: YeahNo, pickcoffee: PickCoffee, serverStatus: ServerStatus) {
        this.controllerList = [bansa, restaurant, dust, yeahNo, pickcoffee, serverStatus];
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