// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    app: {
        head: {
          title: "Book Tire Service & Fitting | Mobile Tire Installation | Mobile Tire Pro",
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'canonical', href: 'https://www.mobiletirepro.net/' }
          ],
          meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1.0" },
            { name: "description", content: "Mobile Tire Pro LLC: Expert mobile tire installation service for sedans, SUVs, trucks, and EVs. We come to you for convenient, on-site new tire fitting and TPMS service. Available weekdays 4-5pm and Saturdays 7:30am-5pm. Book online or call for professional, efficient service at your location. Competitive pricing with special offers for new customers. Experience hassle-free tire installation with Mobile Tire Pro." },
            { name: "keywords", content: "Mobile tire installation,On-site tire service,New tire fitting,TPMS service,At-home tire installation,EV tire service,Same-day tire installation,Professional mobile tire service" },
            // Open Graph / Facebook
            { property: "og:type", content: "website" },
            { property: "og:url", content: "https://mobiletirepro.net/" },
            { property: "og:title", content: "Mobile Tire Pro" },
            { property: "og:description", content: "Mobile Tire Pro LLC: Expert mobile tire installation service for sedans, SUVs, trucks, and EVs. We come to you for convenient, on-site new tire fitting and TPMS service." },
            { property: "og:image", content: "/images/meta_img.webp" },
            // Twitter
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:url", content: "https://mobiletirepro.net/" },
            { name: "twitter:title", content: "Mobile Tire Pro" },
            { name: "twitter:description", content: "Mobile Tire Pro LLC: Expert mobile tire installation service for sedans, SUVs, trucks, and EVs. We come to you for convenient, on-site new tire fitting and TPMS service." },
            { name: "twitter:image", content: "/images/meta_img.webp" },
          ],
        },
      },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/google-fonts",
        "nuxt3-leaflet",
        "nuxt-mongoose",
        './modules/auth.module',
        '@nuxtjs/color-mode',
        'nuxt-vue3-google-signin',
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
        classSuffix: '',
        storageKey: 'nuxt-color-mode',
    },
    googleFonts: {
        families: {
            Lato: [400, 700, 900],
            'Kumbh Sans': [400, 700, 900]
        },
        display: 'swap'
    },
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