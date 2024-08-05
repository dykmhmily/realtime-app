import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import assetsRouter from './route/assets'
import assetsWebsocket from './websocket/assets'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/assets', assetsRouter)

const SEVER_PORT = process.env.APP_SEVER_PORT || 7163
const server = app.listen(SEVER_PORT, () => {
  console.log(`Server is running at Port ${SEVER_PORT}.`)
})

assetsWebsocket(server)
