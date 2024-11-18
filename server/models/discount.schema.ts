import {defineMongooseModel} from "#nuxt/mongoose";
import {servicesSchema} from "~/server/models/services.schema";

export const discountSchema = defineMongooseModel({
    name: 'discount',
    schema: {
        isActive: {
            type: 'Boolean',
            default: false
        },
        percentage: {
            type: 'Number',
            default: 0
        },
        validUntil: {
            type: 'Date',
        },
        affectedServices: [{
            type: 'ObjectId',
            ref: 'Service',
        }],
        name: {
            type: 'string',
        },
        description: {
            type: 'string'
        }
    }
})