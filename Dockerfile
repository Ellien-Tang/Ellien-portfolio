# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm ci

# Build frontend
COPY . .
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy backend code
COPY server/ ./server/

# Copy built frontend
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "server/server.js"]
