import { Hono } from 'hono'
import { getIndexHtml } from '../templates/index.html'

const page = new Hono()

page.get('/', (c) => {
  return c.html(getIndexHtml())
})

export default page
