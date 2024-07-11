import {userSchema} from "~/server/models/user.schema";
import {aptsSchema} from "~/server/models/apts.schema";

export default defineEventHandler(async (event) => {
    try {
        const {carId, service, appointmentDate, address} = await readBody(event);
        const email = await getAuth(event)
        const user = await userSchema.findOne({email}).select('-password')
        const apt = new aptsSchema({carId, service, appointmentDate, address, userId: user?._id})
        await apt.save()
        await userSchema.findByIdAndUpdate(user?._id, {$push:{apts: apt._id}})
        return 'OK'


    } catch (e) {

    }
})
