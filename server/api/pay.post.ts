import {Client} from "square";
import {randomUUID} from "crypto";

//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};


// noinspection JSDeprecatedSymbols
const {paymentsApi} = new Client({
    //@ts-ignore
    accessToken: "EAAAl2qnDH7fnkk16sjrV1ojlKkSGPGha1bJv8_j6yR08smnJsKPHx2vrfz83Q2Y",
    //@ts-ignore
    environment: "sandbox",
});


export default defineEventHandler(async (event) => {
    const {locationId, sourceId, amountMoney} = await readBody(event);


    try {
        const {result} = await paymentsApi.createPayment({
            locationId,
            sourceId,
            idempotencyKey: randomUUID(),
            amountMoney
        });
        return result;
    } catch (error) {
        console.log(error);
    }
});