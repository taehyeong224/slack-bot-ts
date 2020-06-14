import {BaseController} from "./base/BaseController";
import {ChatPostMessageArguments} from "@slack/web-api";
import {channels} from "../../config/token";
import request from 'request';
import cheerio from 'cheerio';


export class PickCoffee extends BaseController {
    result: ChatPostMessageArguments = {channel: channels.general, text: 'ㅋㅋ'};
    public async makePayload(): Promise<ChatPostMessageArguments> {
        
        return this.result;
    }

    public async prepare(): Promise<void> {
        let arr: string[] = [];
        let url = 'https://www.baristapaulbassett.co.kr/menu/List.pb?cid1=A';
        let pickone: string = '';

        request(url, (err, res)=>{
            if(err) throw err;
            const $ = cheerio.load(res.body);
            let data = $('div.menuList ul.listStyleB li');
            data.each(function(i,elem){
                arr[i] = cheerio(elem).find("a").children("div.txtArea").text();
            });
            const index = Math.floor(Math.random() * arr.length);
            pickone = arr[index];
            this.result = {channel: channels.general, text: pickone, icon_emoji: ":raised_hand_with_fingers_splayed:"};
            return;
        });
        console.log('밖에서', this.result)
    }

    public checkCondition(): boolean {
        return this.text === "오늘의커피";
    }
}








// export class PickCoffee extends BaseController {
//     public async makePayload(): Promise<ChatPostMessageArguments> {
//        const coffeeMenu:string[] = [
//            "HOT카라멜마끼아또", "HOT아메리카노", "ICE에티오피아싱글오리진", "HOT카페라테", "에스프레소", "ICE아메리카노", "ICE카라멜마끼아또", "ICE카페라떼", "ICE카푸치노", "HOT카푸치노", "마시지 마"
//        ]

//        const index = Math.floor(Math.random() * coffeeMenu.length);
//        const pickone = coffeeMenu[index];
       
//        return {channel: channels.general, text: pickone, icon_emoji: ":coffee:"};
//     }

//     public async prepare(): Promise<void> {
//     }

//     public checkCondition(): boolean {
//         return this.text === "오늘의커피";
//     }
// }