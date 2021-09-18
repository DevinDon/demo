FROM node:16-alpine3.14

ARG SET_DB_HOST
ARG SET_DB_PORT
ARG SET_DB_NAME
ARG SET_DB_USER
ARG SET_DB_PASS

ENV DB_HOST=${SET_DB_HOST} \
  DB_PORT=${SET_DB_PORT} \
  DB_NAME=${SET_DB_NAME} \
  DB_USER=${SET_DB_USER} \
  DB_PASS=${SET_DB_PASS} \
  NODE_ENV=production

WORKDIR /app

COPY ["./dist/apps/weibo-api", "/app"]

CMD ["node", "/app/main.js"]
