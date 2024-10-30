import {defineMongooseModel} from "#nuxt/mongoose";

export const servicesSchema = defineMongooseModel({
    name: 'Service',
    schema: {
        name: {
            type: 'String',
            required: true
        },
        rims: {
            min: {type: 'number'},
            max: {type: 'number'},
        },
        price: {
            type: 'number',
            required: true,
        },
        tireCount: {
            type: 'number'
        },
        time: {
            type: 'string'
        }
    }
})