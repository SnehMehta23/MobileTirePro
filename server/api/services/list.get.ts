import {servicesSchema} from "~/server/models/services.schema";
import {discountSchema} from "~/server/models/discount.schema";

export default defineEventHandler(async (event) => {
    try {
        return await servicesSchema.find().populate('discounts');
    } catch (e) {
        return {
            status: 401,
            message: e.message
        }
    }
})