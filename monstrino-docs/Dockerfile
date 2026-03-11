# -------- build stage --------
FROM node:20-bookworm-slim AS build

WORKDIR /app

ARG SITE_ENV=prod
ENV SITE_ENV=${SITE_ENV}

COPY package.json yarn.lock ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

RUN yarn build


# -------- runtime stage --------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build ./

EXPOSE 80
