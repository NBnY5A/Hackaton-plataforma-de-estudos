FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /usr/app

ENV NODE_ENV=production

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD [ "node", "src/app.js" ]