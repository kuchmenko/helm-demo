import { Hono } from 'hono'
import z from 'zod';

const EnvSchema = z.object({
  // HELM Secrets
  PG_HOST: z.string(),
  PG_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
  ALCHEMY_KEY: z.string(),

  // HELM Shared values
  NODE_ENV: z.enum(['development', 'production']),
  CHAIN_ID: z.string(),
  RPC_URL: z.record(z.string()),

  // Service-specific values
  INDEX_INTERVAL: z.string().regex(/^\d+$/),
});


const parsed = EnvSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ Missing/invalid env vars', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Api Gateway!')
})

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})


const server = Bun.serve({
  port: process.env.PORT || 3000,
  fetch: app.fetch,
})

console.log(`🚀 Indexer running on port ${server.port}`)
