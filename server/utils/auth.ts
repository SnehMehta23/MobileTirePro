import {H3Event} from "h3";
import {_useSession} from "~/server/utils/session";

export async function setAuth(event: H3Event, email: string) {
    const token = await createJWT(email)
    // console.log(token)
    //@ts-ignore
    return await _useSession(event, token, email)
}

export async function getAuth(event: H3Event) {
    //  return getCookie(event, 'authorization')
    return (await _useSession(event)).data.email
}

export async function clearAuth(event: H3Event) {
    return (await _useSession(event)).clear()
}


export async function requireAuth(event: H3Event) {
    try {
        const token = (await _useSession(event)).data.token

        if (!token) {
            throw createError({
                statusCode: 408,
                statusText: 'Unauthorized! token invalid.'
            })
        }

        const payload = verifyToken(token)

        return payload
    } catch (e) {
        return 408
    }

}