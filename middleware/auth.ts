export default defineNuxtRouteMiddleware((to, from) => {

    async function isAuthenticated() {
        const res = await $fetch('/api/auth/test', {
            method: 'GET'
        })
        if (!res) {
            navigateTo("/")
        }
    }

    try {
        isAuthenticated()
    } catch (e) {
        console.error(e)
    }

})