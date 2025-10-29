# ---------- Step 1: Build the Next.js app ----------
FROM node:22-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire source code
COPY . .

# Build the Next.js production bundle
RUN npm run build


# ---------- Step 2: Run the optimized app ----------
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only required files for runtime
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# Copy build output and static assets
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Optional: Copy any other root-level files you use (like tsconfig.json, if needed)
# COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Cloud Run expects your app to listen on $PORT
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Define build-time ARG for Mongo URI (optional, but not required when using Cloud Run secrets)
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}

# Start your Next.js production server
CMD ["npm", "start"]
