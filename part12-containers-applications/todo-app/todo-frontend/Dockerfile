
FROM node:20 AS base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
EXPOSE 5173

FROM base AS test
COPY . .
RUN npm run test 

FROM base AS prod
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "5173"]

FROM base AS dev
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]