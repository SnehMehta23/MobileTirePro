export default defineNuxtRouteMiddleware(async (to, from) => {

    async function isAuthenticated() {
        try {
            const {data} = await useFetch('/api/auth/test', {
                method: 'GET'
            })
            // console.log(data.value) // This should log the response data directly
            return data.value
        } catch (e) {
            console.error(e)
        }
    }
    if (!await isAuthenticated()) {
        // console.log('triggered middleware')
        return navigateTo('/login')
    }


})