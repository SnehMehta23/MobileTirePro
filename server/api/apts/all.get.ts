import {aptsSchema} from "~/server/models/apts.schema";

export default defineEventHandler(async (event) => {
    try {
        const appointments = await aptsSchema.find().populate('userId').populate('carId');
        return {
            status: 'success',
            data: appointments,
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: error.message,
        };
    }
});