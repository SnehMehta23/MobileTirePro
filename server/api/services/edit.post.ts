import {servicesSchema} from "~/server/models/services.schema";


export default defineEventHandler(async (event) => {
    try {
        const {name, rims, price, tireCount, time, _id} = await readBody(event);
        return await servicesSchema.findByIdAndUpdate(_id, {name, rims, price, tireCount, time})
    } catch (e) {
        return {
            status: '400',
            message: e.message,
        };
    }
})