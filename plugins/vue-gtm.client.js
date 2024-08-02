import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createGtm({
      id: "GTM-N9TR8WBG",
      defer: false,
      compatibility: false,
      enabled: true,
      debug: false,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  );
});
