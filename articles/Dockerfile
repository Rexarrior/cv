FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY articles ./articles
RUN npm run build:articles

FROM nginx:alpine

COPY --from=builder /app/articles/dist /usr/share/nginx/html
COPY articles/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
