import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {exec} from "shelljs";
import {channels} from "../../config/token";

export class ServerStatus extends BaseController {
    private output: any = {};
    private readonly dangerous: string[] = ["sudo", "rm", "chmod"];
    public checkCondition(): boolean {
        return this.text.startsWith("s:");
    }

    public async makePayload(): Promise<ChatPostMessageArguments> {
        return {channel: channels.general, text: this.output["stdout"], icon_emoji: ":dog:"};
    }

    public async prepare(): Promise<void> {
        const command = this.text.split("s:")[1].trim();
        console.log("command : ", command);
        for (const item of this.dangerous) {
            if (command.includes(item)) {
                this.output["stdout"] = "허용 되지 않습니다."
                return;
            }
        }
        this.output = exec(command)
        if (this.output["stdout"] === "" || this.output["stdout"] === undefined) {
            this.output["stdout"] = "성공";
        }
        console.log("result : ", this.output["stdout"]);
        return Promise.resolve(undefined);
    }

}