# ===== 1) Build stage =====
FROM node:20-alpine AS build

WORKDIR /app

# If you use npm
COPY package.json package-lock.json ./
RUN npm ci

# If you use yarn, replace the two lines above with:
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

COPY . .

# Build static site
RUN npm run build
# or: RUN yarn build

# ===== 2) Runtime stage =====
FROM nginx:1.27-alpine AS runtime

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the built static site
COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom nginx config (recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Healthcheck endpoint is just static; Nginx will serve it
CMD ["nginx", "-g", "daemon off;"]
