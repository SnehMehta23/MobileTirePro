import mongoose, {mongo} from 'mongoose'
//@ts-ignore
import bcrypt from 'bcryptjs'


export default defineEventHandler(async (event) => {
    const {email, password, ...rest} = await readBody(event)
    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        await mongoose.connection.db.collection('users').insertOne({email, password: hashedPassword, ...rest})
    } catch (e) {
        throw createError({
            statusMessage: 'An error has occurred',
            statusCode: 400
        })
    }



    return {
        registered: true,
        user: email as string
    }
})