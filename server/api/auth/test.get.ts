import {requireAuth} from "~/server/utils/auth";
import {_useSession} from "~/server/utils/session";

export default defineEventHandler(async (event) => {

    const payload = await requireAuth(event)
    return (await _useSession(event)).data

})