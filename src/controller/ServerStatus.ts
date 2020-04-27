import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {exec} from "shelljs";
import {channels} from "../config/token";

export class ServerStatus extends BaseController {
    private output: any = {};

    public checkCondition(): boolean {
        return this.text.startsWith("서버:");
    }

    public async makePayload(): Promise<ChatPostMessageArguments> {
        return {channel: channels.general, text: this.output["stdout"], icon_emoji: ":coffee:"};
    }

    public async prepare(): Promise<void> {
        const command = this.text.split("서버:")[1].trim();
        console.log("command : ", command);
        this.output = exec(command)
        if (this.output["stdout"] === "" || this.output["stdout"] === undefined) {
            this.output["stdout"] = "성공";
        }
        console.log("result : ", this.output["stdout"]);
        return Promise.resolve(undefined);
    }

}