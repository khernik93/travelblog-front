FROM node:11-alpine

RUN apk update && apk add bash
RUN apk update && apk add vim
RUN apk update && apk add curl

WORKDIR /home/app
COPY . /home/app
RUN chown -R node:node /home/app
USER node
COPY package*.json /tmp/

RUN cd /tmp && npm i --production
RUN cp -a /tmp/node_modules /home/app/

COPY --chown=node:node . .
EXPOSE 80

CMD ["npm", "run", "start:prod"]
