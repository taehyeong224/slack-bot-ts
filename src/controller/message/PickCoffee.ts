import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../../config/token";

export class PickCoffee extends BaseController {
    public async makePayload(): Promise<ChatPostMessageArguments> {
       const coffeeMenu:string[] = [
           "HOT카라멜마끼아또", "HOT아메리카노", "ICE에티오피아싱글오리진", "HOT카페라테", "에스프레소", "ICE아메리카노", "ICE카라멜마끼아또", "ICE카페라떼", "ICE카푸치노", "HOT카푸치노", "마시지 마"
       ]

       const index = Math.floor(Math.random() * coffeeMenu.length);
       const pickone = coffeeMenu[index];
       
       return {channel: channels.general, text: pickone, icon_emoji: ":coffee:"};
    }

    public async prepare(): Promise<void> {
    }

    public checkCondition(): boolean {
        return this.text === "오늘의커피";
    }
}