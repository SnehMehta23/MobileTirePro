import {servicesSchema} from "~/server/models/services.schema";
import {discountSchema} from "~/server/models/discount.schema";

export default defineEventHandler(async (event) => {
    try {
        return await servicesSchema.find({isActive: true}).populate('discounts');
    } catch (e: any) {
        return {
            status: 401,
            message: e.message
        }
    }
})
