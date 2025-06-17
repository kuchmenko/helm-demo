###############  BUILD ###############
FROM oven/bun:1.1.13-alpine AS build
WORKDIR /repo

RUN apk add --no-cache nodejs npm
RUN bun add -g pnpm@9.1.1 

COPY . .
RUN pnpm install --filter ./apps/api-gateway... --prod
WORKDIR /repo/apps/api-gateway
RUN bun build src/index.ts --outfile dist/index.js

###############  RUNTIME #############
FROM oven/bun:1.1.13-alpine 
WORKDIR /app
COPY --from=build /repo/apps/api-gateway/dist ./dist
COPY --from=build /repo/apps/api-gateway/node_modules ./node_modules
EXPOSE 3000
CMD ["bun", "dist/index.js"] 
