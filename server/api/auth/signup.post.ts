import mongoose, {mongo} from 'mongoose'
//@ts-ignore
import bcrypt from 'bcryptjs'


export default defineEventHandler(async (event) => {
    const {email, password, ...rest} = await readBody(event)
    const hashedPassword = bcrypt.hashSync(password, 10)

    try {
        const existingUser = await mongoose.connection.db.collection('users').findOne({email})
        if (existingUser) {
            throw new Error('User already Exists')
        }
        await mongoose.connection.db.collection('users').insertOne({email, password: hashedPassword, ...rest})
    } catch (e: any) {
        throw createError({
            statusMessage: e.message,
            statusCode: 400
        })
    }
    return {
        registered: true,
        user: email as string
    }
})