import {defineMongooseModel} from "#nuxt/mongoose";

export const aptsSchema = defineMongooseModel({
    name: 'Apt',
    schema: {
        //@ts-ignore
        appointmentDate: {
            type: 'Date',
        },
        //@ts-ignore
        carId: {
            type: 'ObjectId',
            ref: 'Car',
        },
        //@ts-ignore
        userId: {
            type: 'ObjectId',
            ref: 'User'
        },
        service: {
            type: 'string',
        },
        //@ts-ignore
        tpm: {
            type: 'number',
            default: 0
        },
        address: {
            type: 'string'
        },
        phone:{
            type: 'string'
        },
        //@ts-ignore
        status: {
            type: 'string',
            enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
            default: 'Pending'
        }
    }
});
