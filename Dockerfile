FROM node:17-alpine as client

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

EXPOSE 80

COPY --from=client /frontend/build/ /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]

