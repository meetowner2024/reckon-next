# Step 1: Build the Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Run the app using a lightweight image
FROM node:18-alpine
WORKDIR /app

# Copy only the necessary files from builder
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 8080
ENV PORT 8080
CMD ["npm","run","start"]
