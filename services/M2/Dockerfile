FROM node:20.5-alpine3.17 as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:20.5-alpine3.17 as prod

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install --production

CMD ["node", "dist/index.js"]



FROM node:20.5 as dev

WORKDIR /app

CMD npm run dev