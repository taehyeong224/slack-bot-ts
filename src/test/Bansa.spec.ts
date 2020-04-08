import {describe} from "mocha"
import {mock} from "sinon";
import {Bansa} from "../controller/Bansa";
import {ChatPostMessageArguments, WebClient} from "@slack/web-api";
import {generate} from "shortid";
import {expect} from "chai";
import {channels} from "../config/token";

describe("Bansa", function () {
    let bansa: Bansa;
    let mocWebClient: any;
    const randomString: string = generate();

    before("init class", function () {
        mocWebClient = mock(new WebClient(""));
        bansa = new Bansa(mocWebClient);
        bansa.text = randomString;
    });

    describe("makePayload", function () {
        it("호출 시, ChatPostMessageArguments 리턴 해야 한다.", function (done: any) {
            bansa.makePayload().then((result: ChatPostMessageArguments) => {
                const text = `
반사
반사
반사
반사
반사
반사
반사
`;
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
            expect(bansa.checkCondition()).to.be.eq(false);
            done();
        });

        it("text 가 '바보' 이면, true 반환 해야 한다.", function (done) {
            bansa.text = "바보";
            expect(bansa.checkCondition()).to.be.eq(true);
            done();
        })
    })
});