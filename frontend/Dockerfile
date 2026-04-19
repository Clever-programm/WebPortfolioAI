FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# We will use Nginx container to serve the static files in production,
# but we can provide a default nginx config here for a standalone frontend container if needed.
# Since we have a top-level Nginx reverse proxy, this Dockerfile could just build the files.
# We'll use a multi-stage build that just outputs the files, but wait, docker-compose build needs an image.
# We will use a lightweight static server if run independently, or copy files in docker-compose.
# To keep it simple, let's output a small image with nginx to serve the frontend, 
# then the main Nginx proxies to it, OR the main Nginx can mount the volume.
# Let's serve it with Nginx on port 80 internally.

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
