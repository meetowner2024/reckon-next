# ---------- Step 1: Build the Next.js app ----------
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies (clean, reproducible)
RUN npm ci

# Copy the rest of your source code
COPY . .

# Build the Next.js production bundle
RUN npm run build


# ---------- Step 2: Run the production build ----------
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only the necessary files for runtime
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy build output and static assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy Next.js config file (use .mjs if you have that)
COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Cloud Run expects app to listen on $PORT
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

# Start your Next.js app
CMD ["npm", "start"]
