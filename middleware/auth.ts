export default defineNuxtRouteMiddleware((to, from) => {

    async function isAuthenticated() {
        const res = await $fetch('/api/auth/test', {
            method: 'GET'
        })
        //@ts-ignore
        if (!res.isLoggedIn) {
            return navigateTo("/login")
        }
    }

    isAuthenticated()

})