import express from 'express'

const app = express()

const SEVER_PORT = 7163
app.listen(SEVER_PORT, () => {
  console.log(`Server is running at Port ${SEVER_PORT}.`)
})
