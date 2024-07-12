import {getAuth} from "~/server/utils/auth";
import {userSchema} from "~/server/models/user.schema";
import {carSchema} from "~/server/models/car.schema";

export default defineEventHandler(async (event) => {
    try {
        const email = await getAuth(event);
        const user = await userSchema.findOne({email}).select('-password')
        const carList: any = user?.cars;
        let res: any = [];
        for (const id of carList) {
            let car = await carSchema.findById(id)
            res.push(car)
        }
        return res;

    } catch (e: any) {
        console.error(e)
        throw createError({
            statusMessage: e.message,
            statusCode: 400
        })
    }
})