import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../config/token";
import axios from "axios";

export class Tracker extends BaseController {
    private message: string = "";
    private codeNum: string = "";
    private invoiceNum: string = "";
    private readonly baseURL: string = `http://info.sweettracker.co.kr`;
    private readonly codeList: {[key:string]: string} = {
        "건영택배":	"18",
        "경동택배":	"23",
        "홈픽택배":	"54",
        "굿투럭":	"40",
        "농협택배":	"53",
        "대신택배":	"22",
        "로젠택배":	"06",
        "롯데택배":	"08",
        "세방":	"52",
        "애니트랙":	"43",
        "우체국택배":	"01",
        "일양로지스":	"11",
        "천일택배":	"17",
        "한덱스":	"20",
        "한의사랑택배":	"16",
        "한진택배":	"05",
        "합동택배":	"32",
        "호남택배":	"45",
        "CJ대한통운":	"04",
        "CU편의점택배":	"46",
        "CVSnet 편의점택배":	"24",
        "KGB택배":	"56",
        "KGL네트웍스":	"30",
        "SLX":	"44",
        "하이택배":	"58",
        "FLF퍼레버택배":	"64",
        "롯데글로벌 로지스":	"99",
        "범한판토스":	"37",
        "에어보이익스프레스":	"29",
        "APEX(ECMS Express)":	"38",
        "CJ대한통운 국제특송":	"42",
        "Cway Express":	"57",
        "DHL":	"13",
        "DHL Global Mail":	"33",
        "EMS":	"12",
        "Fedex":	"21",
        "GSI Express":	"41",
        "GSMNtoN(인로스)":	"28",
        "i-Parcel":	"34",
        "TNT Express":	"25",
        "EuroParcel(유로택배)":	"55",
        "UPS":	"14",
        "USPS":	"26"
    };

    public checkCondition(): boolean {
        return this.text.includes("택배:");
    }

    public async prepare(): Promise<void> {
        this.codeNum = this.codeList[this.text.split(':')[0]]);
        this.invoiceNum = this.text.split(':')[1];
        const result = await this.getStatus();
        if (result.code !== '200') {
            this.message = '!';
            return;
        }
        this.message = this.getMessage(result.details);
    }

    public async makePayload(): Promise<ChatPostMessageArguments> {        
        return {channel: channels.general, text: this.message, icon_emoji: ":package:"};
    }

    async getStatus() {
        const data = await this.request();
        console.log('data',data);
        return {
            code: data.code || '200',
            details: data.trackingDetails || ''
        };
    }

    private getMessage(details: Array) {
        let text: string = '';
        let arrow: string = '';
        let time: string = '';
        details.map((item: any, idx: any) => {
            arrow = idx === details.length-1 ? '' : ' ->';
            time = !idx || idx === details.length-1 ? `(${item.timeString})` : '';
            text += `${item.where}[${item.kind}]${time}${arrow}`;
        });
        return text;
    }

    private async request(): Promise<any> {
        try {
            const url = `${this.baseURL}/api/v1/trackingInfo?t_key=${process.env.TRACKER_API_KEY}&t_code=${this.codeNum}&t_invoice=${this.invoiceNum}`
            const response = await axios.get(url);
            console.log('res::', response);
            return response.data;
        } catch(e) {
            console.error("axios error", e);
            return false;
        }
    }
}