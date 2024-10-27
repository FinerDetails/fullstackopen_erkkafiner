FROM node:20 AS base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base AS dev
COPY . .
RUN npm install
CMD ["npm", "start"]

FROM base AS prod
COPY . .
RUN npm ci
CMD ["npm", "start"]