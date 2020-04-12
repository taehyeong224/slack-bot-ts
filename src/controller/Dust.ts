import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import axios from "axios";
import {channels} from "../config/token";

type PM = { GOOD: number, NORMAL: number, BAD: number, VERY_BAD: number }
type DustStatus = { GOOD: string, NORMAL: string, BAD: string, VERY_BAD: string }
type PMType = { PM10: string, PM25: string }

export class Dust extends BaseController {
    private message: string = "";
    private readonly baseURL: string = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnMesureLIst`;
    private readonly PM10: PM = {
        GOOD: 30,
        NORMAL: 80,
        BAD: 150,
        VERY_BAD: 999
    };
    private readonly PM25: PM = {
        GOOD: 15,
        NORMAL: 35,
        BAD: 75,
        VERY_BAD: 999
    };

    private readonly TYPE: PMType = {
        PM10: "PM10",
        PM25: "PM25"
    };

    private readonly DUST_STATUS: DustStatus = {
        GOOD: "좋음",
        NORMAL: "보통",
        BAD: "나쁨",
        VERY_BAD: "매우 나쁨"
    };

    checkCondition(): boolean {
        return ['미세먼지', '미먼'].includes(this.text);
    }

    async makePayload(): Promise<ChatPostMessageArguments> {
        return {channel: channels.general, text: this.message, icon_emoji: ":mask:"};
    }

    async prepare(): Promise<void> {
        const [pm10, pm25] = await Promise.all([this.getStatus(this.TYPE.PM10), this.getStatus(this.TYPE.PM25)]);
        if (!pm10 || !pm25) {
            this.message = "서버에 문제가 생겼나봐요";
            return;
        }
        this.message = this.getMessage(pm10, pm25);
    }

    async getStatus(type: string) {
        const data = await this.request(type);
        if (!data) {
            return false;
        }
        const seoulData = data.list[0].seoul;
        let status = "";

        switch (type) {
            case this.TYPE.PM10:
                if (seoulData < this.PM10.GOOD) {
                    status = this.DUST_STATUS.GOOD;
                } else if (seoulData < this.PM10.NORMAL) {
                    status = this.DUST_STATUS.NORMAL;
                } else if (seoulData < this.PM10.BAD) {
                    status = this.DUST_STATUS.BAD;
                } else {
                    status = this.DUST_STATUS.VERY_BAD;
                }

                break;

            case this.TYPE.PM25:
                if (seoulData < this.PM25.GOOD) {
                    status = this.DUST_STATUS.GOOD;
                } else if (seoulData < this.PM25.NORMAL) {
                    status = this.DUST_STATUS.NORMAL;
                } else if (seoulData < this.PM25.BAD) {
                    status = this.DUST_STATUS.BAD;
                } else {
                    status = this.DUST_STATUS.VERY_BAD;
                }

                break;
        }

        return {
            status: status,
            data: seoulData
        };
    }

    private async request(type: string): Promise<any> {
        try {
            const key = process.env.DUST_API_KEY;
            const url = `${this.baseURL}?serviceKey=${key}&numOfRows=1&pageNo=1&itemCode=${type}&dataGubun=HOUR&searchCondition=WEEK&_returnType=json`;
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            console.error("axios error", e);
            return false;
        }
    }

    private getMessage(pm10: any, pm25: any): string {
        return `
현재 서울 미세 먼지
pm10: ${pm10.data} ${pm10.status}
pm2.5: ${pm25.data} ${pm25.status}`
    }
}