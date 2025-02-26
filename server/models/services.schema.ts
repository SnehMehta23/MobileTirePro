import {defineMongooseModel} from "#nuxt/mongoose";
import {discountSchema} from "~/server/models/discount.schema";

export const servicesSchema = defineMongooseModel({
    name: 'Service',
    schema: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        maxTireCount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        //@ts-ignore
        isActive: {
            type: Boolean,
            default: true,
            index: true, // Useful if you often query by this field
        },
        discounts: [{
            type: 'ObjectId',
            ref: discountSchema
        }]
    }
});
