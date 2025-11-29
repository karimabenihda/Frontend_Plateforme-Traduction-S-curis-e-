FROM node:24.11.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
# COPY  package-lock.json ./
RUN npm install
COPY . .
# FROM node:24.11.0-alpine AS runner

CMD ["npm", "run","dev"]
