import {defineMongooseModel} from "#nuxt/mongoose";


const {mongo} = useRuntimeConfig().auth
export const userSchema = defineMongooseModel({
    name: 'User',
    schema: {
        email: {
            type: 'string',
            unique: true,
        },
        name: 'string',
        password: {
            type: 'string'
        }
    }
})
