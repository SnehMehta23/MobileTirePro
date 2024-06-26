// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxtjs/seo",
        "@vue-email/nuxt",
        "nuxt3-leaflet"
    ],
    googleFonts: {
        families: {
          Lato: [100, 300, 400, 700, 900] // Add the weights you need
        },
        display: 'swap' // This is optional but recommended for better performance
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    }
})