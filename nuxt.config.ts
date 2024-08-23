// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/fonts", "nuxt-auth-utils"],
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  colorMode: {
    preference: "dark",
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGO_DB_CONNECTION_STRING,
  },
});
