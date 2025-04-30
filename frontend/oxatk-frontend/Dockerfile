# Stage 1: build
FROM node:18-alpine AS builder
WORKDIR /app

# copy package files and install deps
COPY package*.json ./
RUN npm ci

# copy source & build
COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:stable-alpine
# remove default nginx content
RUN rm -rf /usr/share/nginx/html/*
# copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# optional: copy a custom nginx.conf if you need push-state routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
