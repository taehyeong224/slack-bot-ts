import {ChatPostMessageArguments} from "@slack/web-api";

export interface BaseCronInterface {
    makePayload(): Promise<ChatPostMessageArguments>
    sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void>
    runCronJob(): void
}