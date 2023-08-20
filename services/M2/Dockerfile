FROM node:20.5 as prod

WORKDIR /app
COPY ./ /app
RUN npm install --production
RUN npm run build

WORKDIR /var/www/app
RUN cp -r /app /var/www

CMD npm run start



FROM node:20.5 as dev

WORKDIR /app

CMD npm run dev