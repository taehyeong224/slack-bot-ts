import {ChatPostMessageArguments} from "@slack/web-api";

export interface BaseCronInterface {
    makePayload(): Promise<ChatPostMessageArguments|void>
    sendToSlack(payload: ChatPostMessageArguments | undefined): Promise<void>
    runCronJob(): void
}