FROM node:lts

WORKDIR /my-nuxt-app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]
