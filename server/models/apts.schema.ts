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
            enum: ['2 Tire installation (Large SUV/Truck/EV)',
                '2 Tire installation (Sedan/Coupe/Small SUV)',
                '4 Tire installation (Large SUV/Truck/EV)',
                "4 Tire installation (Sedan/Coupe/Small SUV)",
                "Seasonal Changeover (Tires Only)",
                'Seasonal Changeover (Tire & Wheel Assemblies)']
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