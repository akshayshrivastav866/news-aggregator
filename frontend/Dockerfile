FROM node:20.11.1-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install -g gatsby-cli
RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]
