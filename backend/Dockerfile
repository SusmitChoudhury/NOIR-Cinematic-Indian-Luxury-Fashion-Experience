# Multi-stage lightweight Node 20 Dockerfile for Railway
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production || npm install --production

# Copy application files
COPY src/ ./src/

EXPOSE 8000

CMD ["node", "src/index.js"]
