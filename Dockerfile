# Stage 1: Build stage
FROM node:lts-alpine AS build

WORKDIR /my-nuxt-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production stage

FROM node:lts-alpine AS production

WORKDIR /my-nuxt-app

COPY --from=build /my-nuxt-app/.output ./.output

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]