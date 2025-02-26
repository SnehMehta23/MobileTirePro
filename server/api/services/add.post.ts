import {servicesSchema} from "~/server/models/services.schema";


export default defineEventHandler(async (event) => {
    try {
        const {name, price, tireCount} = await readBody(event);
        const newService = new servicesSchema({name, price, tireCount,})
        await newService.save()
        return 'OK'
    } catch (e:any) {
        return {
            status: '400',
            message: e.message,
        };
    }
})
