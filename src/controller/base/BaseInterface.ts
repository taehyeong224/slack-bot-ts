import {ChatPostMessageArguments} from "@slack/web-api";

export interface BaseInterface {
    prepare(): Promise<void>
    makePayload(): Promise<ChatPostMessageArguments>
    sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void>
}