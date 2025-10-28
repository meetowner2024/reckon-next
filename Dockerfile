# ---------- Step 1: Build the Next.js app ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build


# ---------- Step 2: Run the optimized app ----------
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy the production build output and assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# If you use next.config.mjs instead of .js, copy that instead:
# COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 8080
ENV PORT=8080
CMD ["npm", "start"]
