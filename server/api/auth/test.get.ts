import {requireAuth} from "~/server/utils/auth";
import {_useSession} from "~/server/utils/session";

export default defineEventHandler(async (event) => {

    try {
        const payload = await requireAuth(event)
        if (payload === 408){
            return false
        }
        return (await _useSession(event)).data
    } catch (e: any) {
        console.error(e.message);
    }

})