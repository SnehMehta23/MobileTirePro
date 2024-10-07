import {defineStore} from 'pinia'

export const useQuoteStore = defineStore('store', {
    state: () => {
        return {
            address: {
                street: '',
                city: '',
                zipCode: "",
                state: 'Illinois'
            },
            service: '',
            tpm: 0,
            phone: '',
            date: null,
            price: 0


        }
    },
    persist: true,
    actions: {
        /**
         *
         * @param address
         * @param service
         * @param tpm
         * @param phone
         * @param date
         */
        async saveQuote(address, service, tpm, phone, date, price){
            this.address = address
            this.service = service
            this.tpm = tpm
            this.phone = phone
            this.date = date
            this.price = price

        }
    }
})