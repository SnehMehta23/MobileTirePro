import {discountSchema} from "~/server/models/discount.schema";
import {settingsSchema} from "~/server/models/settings.schema";

export default defineEventHandler(async (event) => {
    try {
        const {text} = await readBody(event)
        const setting = await settingsSchema.findOneAndUpdate({name: 'banner'}, {text: text})
        console.log(setting)
        console.log(text)
        return 'OK'


    } catch (e) {
        return {
            status: '400',
            message: e.message
        }
    }
})