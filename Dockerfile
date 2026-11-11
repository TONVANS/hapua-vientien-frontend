# ------------------------------------------------------------------------------
# Stage 1: Install Dependencies
# ------------------------------------------------------------------------------
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

# ------------------------------------------------------------------------------
# Stage 2: Build Next.js Application
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_API_URL=/vientiane/api/v1
ARG NEXT_PUBLIC_SITE_URL=http://hapua.edl.com.la/vientiane
ARG INTERNAL_BACKEND_URL=http://vientien-backend:3001/api/v1

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV INTERNAL_BACKEND_URL=$INTERNAL_BACKEND_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ------------------------------------------------------------------------------
# Stage 3: Production Runtime (Next.js Standalone)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache curl libc6-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

