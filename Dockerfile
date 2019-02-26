FROM node:10

#RUN apk update && apk add bash

WORKDIR /home/node
COPY . /home/node
RUN chown -R node:node /home/node
USER node
COPY package*.json /tmp/

RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /home/node/

COPY --chown=node:node . .
EXPOSE 80

CMD ["npm", "run", "start:prod"]
