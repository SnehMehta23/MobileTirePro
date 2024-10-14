export const analyticsConfig = {
    googleAnalytics: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-60F22QVQTB",
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "G-60F22QVQTB");
        `,
        type: 'text/javascript',
      },
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-YVVT9JK3Z4",
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "G-YVVT9JK3Z4");
        `,
        type: 'text/javascript',
      }
    ]
}