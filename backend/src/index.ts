import Express from 'express'
import cors from 'cors'
import 'dotenv/config'

import assetsRouter from './route/assets'

const app = Express()

app.use(cors())
app.use(Express.json())

app.use('/assets', assetsRouter)

const SEVER_PORT = 7163
app.listen(SEVER_PORT, () => {
  console.log(`Server is running at Port ${SEVER_PORT}.`)
})
