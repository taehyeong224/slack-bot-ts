import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";

export class PickCoffee extends BaseController {
    public async makePayload(): Promise<ChatPostMessageArguments> {
       const coffeeMenu:string[] = [
           "카라멜마끼아또", "아메리카노", "에티오피아싱글오리진", "카페라테", "에스프레소"
       ]
       console.log(coffeeMenu);
       const index = Math.floor(Math.random() * coffeeMenu.length);
       const pickone = coffeeMenu[index];
       return {channel: channels.general, text: pickone, icon_emoji: ":blob-hearts:"};
    }

    public async prepare(): Promise<void> {
    }

    public checkCondition(): boolean {
        return this.text === "오늘의커피";
    }

}