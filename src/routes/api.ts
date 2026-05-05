import { Hono } from 'hono'
import { store } from '../store'

const api = new Hono()

api.get('/save/:id', (c) => {
  const id = c.req.param('id')
  const data = store[id]
  if (!data) {
    return c.json({ exists: false })
  }
  return c.json({ exists: true, data })
})

api.post('/save/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json()
  store[id] = body
  return c.json({ success: true })
})

export default api
