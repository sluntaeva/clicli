import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './routes/api'
import page from './routes/page'

const app = new Hono()

app.use('/api/*', cors())
app.route('/api', api)
app.route('/', page)

export default app
