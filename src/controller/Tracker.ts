import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";

export class Tracker extends BaseController {
    private message: string = "";
    private readonly baseURL: string = `http://info.sweettracker.co.kr`;
    private readonly api_key: string = 'L1eUkqQVnZiS3nyHUfh0xA';
    private readonly company_code: Object = {
        "건영택배":	18,
        "경동택배":	23,
        "홈픽택배":	54,
        "굿투럭":	40,
        "농협택배":	53,
        "대신택배":	22,
        "로젠택배":	0o6,
        "롯데택배":	08,
        "세방":	52,
        "애니트랙":	43,
        "우체국택배":	0o1,
        "일양로지스":	11,
        "천일택배":	17,
        "한덱스":	20,
        "한의사랑택배":	16,
        "한진택배":	0o5,
        "합동택배":	32,
        "호남택배":	45,
        "CJ대한통운":	04,
        "CU편의점택배":	46,
        "CVSnet 편의점택배":	24,
        "KGB택배":	56,
        "KGL네트웍스":	30,
        "SLX":	44,
        "하이택배":	58,
        "FLF퍼레버택배":	64,
        "롯데글로벌 로지스":	99,
        "범한판토스":	37,
        "에어보이익스프레스":	29,
        "APEX(ECMS Express)":	38,
        "CJ대한통운 국제특송":	42,
        "Cway Express":	57,
        "DHL":	13,
        "DHL Global Mail":	33,
        "EMS":	12,
        "Fedex":	21,
        "GSI Express":	41,
        "GSMNtoN(인로스)":	28,
        "i-Parcel":	34,
        "TNT Express":	25,
        "EuroParcel(유로택배)":	55,
        "UPS":	14,
        "USPS":	26
    };

    public async makePayload(): Promise<ChatPostMessageArguments> {
        
        return {channel: channels.general, text: this.message, icon_emoji: ":package:"};
    }

    public async prepare(): Promise<void> {
    }

    public checkCondition(): boolean {
        return this.text.includes("택배:");
    }

    private async request(): Promise<any> {
        try {
            
        } catch(e) {

        }
    }

    async getCode(type: string) {
        
    }

    async getStatus(type: string) {
        const data = await this.request()
    }
}