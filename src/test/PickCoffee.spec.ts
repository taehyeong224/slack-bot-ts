import {describe} from "mocha"
import {mock} from "sinon";
import {PickCoffee} from "../controller/PickCoffee";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {generate} from "shortid";
import {expect} from "chai";
import {channels} from "../config/token";

describe("PickCoffee", function () {
    let pickcoffee: PickCoffee;
    let mocWebClient: any;
    const randomString: string = generate();

    before("init class", function () {
        mocWebClient = mock(new WebClient(""));
        pickcoffee = new PickCoffee(mocWebClient);
        pickcoffee.text = randomString;
    });

    describe("makePayload", function () {
        it("호출 시, ChatPostMessageArguments 리턴 해야 한다.", function (done: any) {
            pickcoffee.makePayload().then((result: ChatPostMessageArguments) => {
                const coffeeMenu:string[] = [
                    "카라멜마끼아또", "아메리카노", "에티오피아싱글오리진", "카페라테", "에스프레소"
                ]
                console.log(coffeeMenu);
                const index = Math.floor(Math.random() * coffeeMenu.length);
                const text = coffeeMenu[index];

                expect(JSON.stringify(result)).to.be.eq(JSON.stringify({
                    channel: channels.general,
                    text,
                    icon_emoji: ":raised_hand_with_fingers_splayed:"
                }));
                done();
            }).catch((error: any) => {
                console.error(error);
                done(error);
            })
        })
    });

    describe("checkCondition", function ()  {
        it("호출 시, false 반환 해야 한다.", function (done) {
            expect(pickcoffee.checkCondition()).to.be.eq(false);
            done();
        });

        it("text 가 '오늘의커피' 이면, true 반환 해야 한다.", function (done) {
            pickcoffee.text = "오늘의커피";
            expect(pickcoffee.checkCondition()).to.be.eq(true);
            done();
        })
    })
});