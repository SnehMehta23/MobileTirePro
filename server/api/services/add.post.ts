import {servicesSchema} from "~/server/models/services.schema";


export default defineEventHandler(async (event) => {
    try {
        const {name, rims, price, tireCount, time} = await readBody(event);
        const newService = new servicesSchema({name, rims, price, tireCount, time})
        await newService.save()
        return 'OK'
    } catch (e) {
        return {
            status: '400',
            message: e.message,
        };
    }
})