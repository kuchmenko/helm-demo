import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Api Gateway!')
})

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// app.get('/test', (c) => {
//   return c.json({ ...process.env })
// })


const server = Bun.serve({
  port: process.env.PORT || 3001,
  fetch: app.fetch,
})

//test 18

console.log(`🚀 Api Gateway running on port ${server.port}`)

