FROM node:9.2
RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . ./
CMD node main.js
