import {H3Event} from "h3";

const {mongo} = useRuntimeConfig().auth

export async function _useSession(event: H3Event, token?: string, email?: string) {

    const session = await useSession(event, {
        password: mongo.secret,
        name: 'authorization',
    })
    if (email)
        await session.update({email, token})
    return {
        ...session,
        data: session.data
    }
}