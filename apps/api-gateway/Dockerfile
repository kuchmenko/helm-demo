#################### 1. BUILD STAGE ####################
FROM node:20-slim AS build
WORKDIR /repo

ENV BUN_INSTALL=/usr/local

RUN apt-get update -y \
  && apt-get install -y curl unzip ca-certificates \
  && curl -fsSL https://bun.sh/install | bash                \
  && npm i -g pnpm@9.1.1                                     \
  && apt-get purge -y curl unzip && apt-get autoremove -y && \
  rm -rf /var/lib/apt/lists/*

COPY . .

RUN pnpm install --filter ./apps/api-gateway... --prod \
  --frozen-lockfile --workspace-root=false

WORKDIR /repo/apps/api-gateway
RUN bun build src/index.ts --outfile dist/index.js

#################### 2. RUNTIME STAGE ###################
FROM node:20-slim AS runtime
WORKDIR /app

COPY --from=build /repo/apps/api-gateway/dist ./dist
COPY --from=build /repo/apps/api-gateway/node_modules ./node_modules

EXPOSE 3000
CMD ["bun", "dist/index.js"]
