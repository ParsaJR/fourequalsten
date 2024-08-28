// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Maketen",
      meta: [
        {
          name: "description",
          content:
            "Maketen is a casual number puzzle, where the goal is to make the 4 numbers in each level equal 10 by using the math symbols provided to us.",
        },
      ],
    },
  },
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
