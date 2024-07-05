// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "@nuxtjs/seo",
        "nuxt3-leaflet",
        "nuxt-mongoose",
        './modules/auth.module',
        '@nuxtjs/color-mode',
        'nuxt-vue3-google-signin'
    ],
    tailwindcss: {
        configPath: '~/tailwind.config.js',
        exposeConfig: true,
        injectPosition: 0,
        viewer: true,
    },
    //@ts-ignore
    googleSignIn: {
        clientId: '44678613954-1iv2ppns1kiosof9nkgdnr3orp3nbor4.apps.googleusercontent.com',
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
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
            cssnano:
                process.env.NODE_ENV === 'production'
                    ? {preset: ['default', {discardComments: {removeAll: true}}]}
                    : false, // disable cssnano when not in production
        },
    }

})
