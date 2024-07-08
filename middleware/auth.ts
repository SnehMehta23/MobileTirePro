export default defineNuxtRouteMiddleware(async (to, from) => {

    async function isAuthenticated() {
        try {
            const res = await $fetch('/api/auth/test', {
                method: 'GET'
            })
            if (!res) {
                return false
            }
        } catch (e) {
            console.error(e)
        }
    }

    console.log(await isAuthenticated())
    if (!await isAuthenticated()) {

        return navigateTo('/login')
    }


})