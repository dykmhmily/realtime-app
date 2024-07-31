import { useEffect, useRef, useState } from 'react'
import Card from './components/card'
import { fetchAssetsList, Asset } from './utils/http'

const useAnimationFrame = (callback) => {
  const frameRef = useRef(0)
  const retryCountRef = useRef(0)
  const maxRetries = 5
  const retryDelay = 2000 // ms

  const animate = async () => {
    try {
      await callback()
      retryCountRef.current = 0 // reset
      frameRef.current = requestAnimationFrame(animate)
    } catch (error) {
      console.error(error)
      retryCountRef.current++
      if (retryCountRef.current <= maxRetries) {
        const delay = retryDelay * Math.pow(2, retryCountRef.current)
        console.log(`Retrying in ${delay}ms...`)
        setTimeout(() => {
          frameRef.current = requestAnimationFrame(animate)
        }, delay)
        return
      } else {
        console.error('Max retries reached. Stopping retries.')
        return
      }
    }
  }

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])
}

function App() {
  const [list, setList] = useState<Array<Asset>>([])
  const [error, setError] = useState<string | null>(null)

  useAnimationFrame(async () => {
    try {
      const res: Array<Asset> = await fetchAssetsList()
      setList(res)
      setError(null)
    } catch (err) {
      setError('Failed. Please try again later....')
      throw err
    }
  })

  return (
    <div className="max-w-[1024px] h-dvh p-10">
      <h1 className="text-xl font-semibold">Cryptocurrency Realtime Price</h1>
      <div className="flex flex-row flex-wrap w-200 mt-8">
        {error
          ? error
          : list.map((item) => {
              return (
                <div
                  className="shrink-0 max-w-full basis-full sm:max-w-1/2 sm:basis-1/2 md:max-w-1/3 md:basis-1/3 pr-4 mb-4"
                  key={item.id}>
                  <Card key={item.id} currency={item.currency} price={item.price} volume={item.volume}></Card>
                </div>
              )
            })}
      </div>
      {/* <div>
        <Pagination></Pagination>
      </div> */}
    </div>
  )
}

export default App
