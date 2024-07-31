import axios, { AxiosInstance, AxiosResponse } from 'axios'
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://rest.coinapi.io',
  headers: {
    Authorization: process.env.COIN_API_KEY as string,
    Accept: 'application/json',
  },
})

export interface Asset {
  asset_id: string
  name: string
  volume_1hrs_usd: number
  price_usd: number
}

export async function fetchAssets({ filterAssetId }: { filterAssetId: string }): Promise<Asset[]> {
  try {
    const response: AxiosResponse<Asset[]> = await axiosInstance({
      method: 'get',
      url: '/v1/assets',
      params: {
        filter_asset_id: filterAssetId,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching assets:', error)
    throw error
  }
}

export default axiosInstance
