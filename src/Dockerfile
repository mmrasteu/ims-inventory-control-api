FROM node:latest

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g nodemon
CMD npm start