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
            enum: [
                '1 Tire installation (12-18" Rims)',
                '1 Tire installation (19-22" Rims)',
                '2 Tire installation (12-18" Rims)',
                '2 Tire installation (19-22" Rims)',
                '3 Tire installation (12-18" Rims)',
                '3 Tire installation (19-22" Rims)',
                '4 Tire installation (12-18" Rims)',
                '4 Tire installation (19-22" Rims)',
                'Seasonal Changeover Tires Only',
                'Seasonal Changeover Tire & Wheel Assemblies'
            ]
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
