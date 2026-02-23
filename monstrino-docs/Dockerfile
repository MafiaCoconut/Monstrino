# -------- build stage --------
FROM node:20-bookworm-slim AS build

WORKDIR /app

ARG SITE_ENV=prod
ENV SITE_ENV=${SITE_ENV}

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN if [ -f package-lock.json ]; then npm ci; \
    elif [ -f yarn.lock ]; then corepack enable && yarn install --frozen-lockfile; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
    else npm install; fi

COPY . .

# 
RUN if [ -f package-lock.json ]; then npm run build; \
    elif [ -f yarn.lock ]; then yarn build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; fi


# -------- runtime stage --------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build ./docusaurus/

EXPOSE 80
