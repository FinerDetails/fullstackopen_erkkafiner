FROM node:20 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 

FROM base AS dev
COPY . .
RUN npm install -g nodemon
CMD ["npm", "run", "dev"]

FROM base AS prod
COPY . .
CMD ["npm", "start"]