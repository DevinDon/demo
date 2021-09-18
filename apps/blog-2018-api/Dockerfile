FROM node:16-alpine3.14

ARG SET_DB_HOST
ARG SET_DB_PORT
ARG SET_DB_NAME
ARG SET_DB_USER
ARG SET_DB_PASS

ENV NODE_ENV=production \
  DB_HOST=${SET_DB_HOST} \
  DB_PORT=${SET_DB_PORT} \
  DB_NAME=${SET_DB_NAME} \
  DB_USER=${SET_DB_USER} \
  DB_PASS=${SET_DB_PASS}

WORKDIR /app

COPY ["./dist/apps/blog-2018-api", "/app"]

CMD ["node", "/app/main.js"]
