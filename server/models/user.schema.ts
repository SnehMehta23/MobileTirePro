import {defineMongooseModel} from "#nuxt/mongoose";

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
    },
    hooks(schema) {
        schema.pre('save', function (this, next) {
            if (this.password && this.email)
                next()

            throw createError({
                statusCode: 500,
                statusMessage: 'validation failed',
            })
        })
    },
})
