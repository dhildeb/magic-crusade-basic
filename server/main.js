import express from 'express'
import { Startup } from './Startup'
import { DbConnection } from './db/DbConfig'
import { createServer } from 'http'
import { logger } from './utils/Logger'

// create server 
const app = express()
const port = process.env.PORT || 3000

const httpServer = createServer(app)
Startup.ConfigureGlobalMiddleware(app)
Startup.ConfigureRoutes(app)

// Connect to Atlas MongoDB
DbConnection.connect()

// Start Server
httpServer.listen(port, () => {
  logger.log(`[SERVING ON PORT: ${port}]`)
})
