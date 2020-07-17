FROM node:10
COPY package.json yarn.lock /src/
COPY public /src/public/
COPY src /src/src/
WORKDIR /src
RUN yarn && yarn build

FROM fintlabsacr.azurecr.io/nginx:1.17.6-4
COPY --from=0 /src/build/ /var/nginx/html/
COPY nginx.conf mime.types /etc/nginx/
