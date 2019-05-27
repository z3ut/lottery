FROM node:12-alpine AS base
ARG LOTTERY_SERVER_HOST
COPY . /src
WORKDIR /src
RUN npm i && npm i -g parcel-bundler && npm run build

FROM nginx
COPY --from=base /src/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
