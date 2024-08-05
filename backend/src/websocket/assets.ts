import { Server } from 'http'
import ws from 'ws'
import { fetchAssets, Asset } from '../utils/coin-api'
const PageList = {
  '1': 'BTC,ETH,LTC,XMR,XRP,DOGE,DASH',
  // 2: 'USD' and so on...
} as const

const transformData = (
  data: Array<Asset>,
): Array<{
  id: string
  currency: string
  price: number
  volume: number
}> => {
  return data.map((item) => ({
    id: item.asset_id,
    currency: item.name,
    price: item.price_usd,
    volume: item.volume_1hrs_usd,
  }))
}

const build = (expressServer: Server) => {
  const websocketServer: ws.Server = new ws.Server({
    noServer: true,
    path: '/assets/list',
  })

  websocketServer.on('connection', async (ws, req) => {
    const url: URL = new URL(req.url as string, 'wss://base.url')
    const params: URLSearchParams = new URLSearchParams(url.search)
    const pageNum: string = params.get('Num') ?? '1'

    try {
      const filterAssetId: string = PageList[pageNum as keyof typeof PageList]
      const data = await fetchAssets({
        filterAssetId: filterAssetId,
      })
      const transformedData = transformData(data)
      console.log(transformedData)
      ws.send(JSON.stringify({ code: 200, data: transformedData }))
    } catch (error) {
      ws.send(JSON.stringify({ code: 500, error: 'Failed to fetch assets' }))
    }

    ws.on('error', console.error)
  })

  expressServer.on('upgrade', (req, socket, head) => {
    websocketServer.handleUpgrade(req, socket, head, (ws) => {
      websocketServer.emit('connection', ws, req)
    })
  })

  return websocketServer
}

export default build
