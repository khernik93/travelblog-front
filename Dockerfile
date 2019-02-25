FROM tiangolo/node-frontend:10 as build-stag
COPY package.json ./e
WORKDIR /var/www/travelblog-front
COPY . .
RUN npm install
EXPOSE 3000
RUN npm run build:prod
CMD ["node", "server/index.ts"]
