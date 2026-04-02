# Build stage
FROM node:22-bookworm AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./
COPY prisma.config.ts ./

RUN npm install
RUN npm run build

# Runtime stage
FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["npm", "start"]
