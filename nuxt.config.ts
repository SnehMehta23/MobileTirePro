// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxtjs/seo",
        "@vue-email/nuxt",
        "nuxt3-leaflet",
        "nuxt-mongoose",
        './modules/auth.module',
        '@nuxtjs/color-mode',
    ],
    tailwindcss: {
        configPath: '~/tailwind.config.js',
        exposeConfig: true,
        injectPosition: 0,
        viewer: true,
    },
    //@ts-ignore
    colorMode: {
        preference: 'light', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '-mode',
        storageKey: 'nuxt-color-mode',
    },
    googleFonts: {
        families: {
          Lato: [400, 700, 900],
          'Kumbh Sans': [400, 700, 900]
        },
        display: 'swap'
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport:
                'width=device-width, initial-scale=1',
        }
    }
    ,
    mongoose: {
        uri: process.env.MONGODB_URI,
        options:
            {}
        ,
        modelsDir: 'models',
        devtools:
            true,
    }

})