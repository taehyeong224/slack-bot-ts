import {describe} from "mocha"
import {mock} from "sinon";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {generate} from "shortid";
import {expect} from "chai";
import {channels} from "../config/token";
import {Restaurant} from "../controller/Restaurant";

describe("Restaurant", function () {
    let restaurant: Restaurant;
    let mocWebClient: any;
    const randomString: string = generate();

    before("init class", function () {
        mocWebClient = mock(new WebClient(""));
        restaurant = new Restaurant(mocWebClient);
        restaurant.text = randomString;
    });

    describe("makePayload", function () {
        it("호출 시, ChatPostMessageArguments 리턴 해야 한다.", function (done: any) {
            restaurant.makePayload().then((result: ChatPostMessageArguments) => {
                const splited: string[] = randomString.split(" ");
                splited.splice(0, 1);
                const query = encodeURIComponent(`${splited.join(" ")} 맛집`);
                expect(JSON.stringify(result)).to.be.eq(JSON.stringify({
                    channel: channels.general,
                    text: `https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=${query}`,
                    icon_emoji: ":ice_cream:"
                }));
                done();
            }).catch((error: any) => {
                console.error(error);
                done(error);
            })
        })
    })
});