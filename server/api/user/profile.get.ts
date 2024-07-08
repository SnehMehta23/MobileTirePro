import mongoose from "mongoose";
import {userSchema} from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    const email = await getAuth(event)
    const user = await userSchema.findOne({email}).select('-password')
    return user;
})