import {servicesSchema} from "~/server/models/services.schema";


export default defineEventHandler(async (event) => {
    try {
        const {_id} = await readBody(event);
        const targetService = await servicesSchema.findByIdAndDelete(_id)
        return 'OK'
    } catch (e) {
        return {
            status: '400',
            message: e.message,
        };
    }
})