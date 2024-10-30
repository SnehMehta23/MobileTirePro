import {servicesSchema} from "~/server/models/services.schema";

export default defineEventHandler(async (event) => {
    try {
        return await servicesSchema.find();
    } catch (e) {
        return {
            status: 401,
            message: e.message
        }
    }
})