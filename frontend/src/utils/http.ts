import axios, { AxiosInstance } from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

export type Asset = {
  id: string
  currency: string
  price: number
  volume: number
}

export function fetchAssetsList(params?: { filterAssetId?: string }): Promise<Asset[]> {
  return axiosInstance({
    method: 'get',
    url: '/assets/list',
    params,
  }).then((response) =>
    response.data.map((item) => ({
      id: item.asset_id,
      currency: item.name,
      price: item.price_usd,
      volume: item.volume_1hrs_usd,
    })),
  )
}

export default axiosInstance
