import {aptsSchema} from "~/server/models/apts.schema";
import {userSchema} from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    try {
        const email = await getAuth(event)
        const user = await userSchema.findOne({email}).select('-password')
        const appointments = await aptsSchema.find({userId: user?._id}).populate('userId').populate('carId');
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