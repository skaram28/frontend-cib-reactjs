# Stage 1: Build the app using Node + Vite
FROM node:20-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the Vite project (TS + Vite)
RUN npm run build

# Stage 2: Serve the build with NGINX
FROM nginx:alpine

# Remove default NGINX website and add our app
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]