//@ts-ignore
import jwt from "jsonwebtoken"

const {mongo} = useRuntimeConfig().auth
const temp :string = 'spring-winter'

const JWT_SECRET = new TextEncoder().encode(mongo.secret)


export async function createJWT(email: string) {
//@ts-ignore
    return jwt.sign({email: email}, temp, {
        expiresIn: 172800 //48 hours
    })
}

export function verifyToken(token: string) {
    //@ts-ignore
    jwt.verify(token, temp, (error: any, decoded: any) => {
        if (error) {
            throw createError({
                statusMessage: error.message,
                statusCode: 401
            })
        }
        return "OK"
    })
}