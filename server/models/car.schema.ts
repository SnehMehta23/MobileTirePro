import {defineMongooseModel} from "#nuxt/mongoose";

export const carSchema = defineMongooseModel({
    name: 'Car',
    schema: {
        make: 'string',
        model: 'string',
        year: 'number',
        //@ts-ignore
        owner: {
            type: 'ObjectId',
            ref: 'User'
        },
        tires: [{
            name: {type: 'string'},
            pressure: {type: 'number'},
            type: {type: 'string'},
            size: {type: 'string'}

        }]
    }
});