// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxtjs/seo", "@vue-email/nuxt"],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            script: [
                // Square Web Payments SDK
                { src: "https://sandbox.web.squarecdn.com/v1/square.js" },
            ],
        },

    }
})