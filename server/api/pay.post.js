import { Client } from "square";
import { randomUUID } from "crypto";

BigInt.prototype.toJSON = function () {
    return this.toString();
};



const { paymentsApi } = new Client({
    accessToken: "EAAAlxT66RPfSQAc2p9ljM_lZHN_nfkTbaJwLKJeGN1_tnRB75LejqKXyC2iWiw8",
    environment: "sandbox",
});


export default defineEventHandler(async (event) => {
    const { locationId, sourceId } = await readBody(event);

    try {
        const { result } = await paymentsApi.createPayment({
            locationId,
            sourceId,
            idempotencyKey: randomUUID(),
            amountMoney: {
                amount: 100,
                currency: "USD",
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
});