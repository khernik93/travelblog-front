# ---------- Base Node ------------
FROM node:11-alpine as base
RUN apk update && apk add bash
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++
WORKDIR /home/app
COPY package*.json ./

# ---------- Dependencies ----------
FROM base as dependencies
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --only=production

# ---------- Release ----------
COPY . .
EXPOSE 80
CMD npm run start:prod
