import {discountSchema} from "~/server/models/discount.schema";
import {servicesSchema} from "~/server/models/services.schema";

export default defineEventHandler(async (event) => {
    try {

        return await settingsSchema.findOne({name: 'banner'})
    } catch (e) {
        return {
            status: '400',
            message: e.message
        }
    }
})