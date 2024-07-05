import mongoose from "mongoose";

export default defineEventHandler(async (event) => {

    const {credentials} = await readBody(event)
    const {email, name, picture} = credentials
    const user = await mongoose.connection.db.collection('users').findOne({email})


    if (!user) {
        try {
            await mongoose.connection.db.collection('users').insertOne({email, name, picture})
            const newUser = await mongoose.connection.db.collection('users').findOne({email})
            await setAuth(event, newUser?.email)
            return {
                loggedIn: true,
                user: newUser?.email as string,
            }
        } catch (e) {
            throw createError({
                statusMessage: 'An error has occurred',
                statusCode: 400
            })
        }
    }
    await setAuth(event, user?.email)
    return {
        loggedIn: true,
        user: user?.email as string,
    }

})
