import {H3Event} from "h3";
import {_useSession} from "~/server/utils/session";

export async function setAuth(event : H3Event, email: string){
    const token = await createJWT(email)
    console.log(token)
    //@ts-ignore
    return await _useSession(event, token)
}

export async function getAuth(event: H3Event) {
    //  return getCookie(event, 'authorization')
    return (await _useSession(event)).data.email
}

export async function requireAuth(event: H3Event) {
    const token = await getAuth(event)
    console.log(token)

    if (!token)
        throw createError({
            statusCode: 401,
            statusText: 'Unauthorized! token invalid.'
        })

    const payload =  verifyToken(token)

    return payload
}