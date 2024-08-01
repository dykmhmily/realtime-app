import NodeCache from 'node-cache'
import Express, { NextFunction, Request, Response } from 'express'
import { fetchAssets, Asset } from '../utils/coin-api'
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 })
const router = Express.Router()
// mock pagination
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

const checkCache = async (req: Request, res: Response, next: NextFunction) => {
  const { pageNum = '1' } = req.query
  const filterAssetId: string = PageList[pageNum as keyof typeof PageList]
  const cachedData = cache.get(filterAssetId)
  // req.filterAssetId = filterAssetId

  if (cachedData) {
    res.send(JSON.parse(cachedData as string))
  } else {
    next() // Continue to the route handler if data is not in the cache
  }
}

router.get('/list', checkCache, async (req: Request, res: Response) => {
  try {
    const { pageNum = '1' } = req.query
    const filterAssetId: string = PageList[pageNum as keyof typeof PageList]
    // const { filterAssetId } = req
    const data = await fetchAssets({
      filterAssetId: filterAssetId,
    })
    const transformedData = transformData(data)
    cache.set(filterAssetId, JSON.stringify(transformedData))
    res.status(200).json(transformedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
})

export default router
