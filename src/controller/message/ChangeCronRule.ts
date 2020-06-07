import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../../config/token";
import {cronHandler} from "../../index";
import {BaseCronInterface} from "../cron/base/BaseCronInterface";

export class ChangeCronRule extends BaseController {
    checkCondition(): boolean {
        return this.text.startsWith('cron change')
    }

    async makePayload(): Promise<ChatPostMessageArguments> {
        return {channel: channels.general, text: '성공', icon_emoji: ":raised_hand_with_fingers_splayed:"};
    }

    async prepare(): Promise<void> {
        const keyword: string = this.text.split('cron change')[1].trim();
        const [name, ...pattern] = keyword.split(' ');
        console.log(pattern)
        const controller: BaseCronInterface | null =  cronHandler.findControllerByName(name)
        if (controller === null) {
            throw new Error("없음")
        }
        await controller.changeCron(pattern.join(' '));
    }

}