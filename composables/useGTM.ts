import { useGtm as useVueGTM } from "@gtm-support/vue-gtm";

export const useGTM = () => {
    const gtm = useVueGTM()
    return gtm
}