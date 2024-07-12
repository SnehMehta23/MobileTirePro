import {Client} from "square";
import {randomUUID} from "crypto";

//@ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};


const config = useRuntimeConfig();

// noinspection JSDeprecatedSymbols
const {paymentsApi} = new Client({
    //@ts-ignore
    accessToken: config.accessToken,
    //@ts-ignore
    environment: "production",
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