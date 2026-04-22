# Build stage
FROM node:22-bookworm AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run prisma:generate
RUN npm run build

# Runtime stage
FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev 

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3001

CMD ["npm", "run", "start"]
