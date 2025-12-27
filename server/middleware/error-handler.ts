export default defineEventHandler((event) => {
  event.node.res.on('finish', () => {
    const statusCode = event.node.res.statusCode
    
    if (statusCode >= 400) {
      console.error(`[${new Date().toISOString()}] Error ${statusCode} - ${event.node.req.url}`)
    }
  })
})
