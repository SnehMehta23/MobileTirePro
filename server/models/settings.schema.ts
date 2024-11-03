import {defineMongooseModel} from "#nuxt/mongoose";


export const settingsSchema = defineMongooseModel({
    name: 'Settings',
    schema: {
        name: {
            type: 'String',
        },
        text: {
            type: 'String',
        }
    }
})