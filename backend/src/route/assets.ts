import Express, { Request, Response } from 'express'
import { fetchAssets, Asset } from '../utils/coin-api'
const router = Express.Router()

router.get('/list', async (req: Request, res: Response) => {
  try {
    const { filterAssetId = 'BTC,ETH,LTC,XMR,XRP,DOGE,DASH' } = req.query
    const data = await fetchAssets({
      filterAssetId: filterAssetId as string,
    })
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' })
  }
})

export default router
