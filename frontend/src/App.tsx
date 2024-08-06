import { useEffect, useRef, useState } from 'react'
import Card from './components/card'
import { Asset } from './utils/http'
const WEBSOCKET_BASE_URL = import.meta.env.VITE_API_WEBSOCKET_BASE_URL || ''

function App() {
  const [list, setList] = useState<Array<Asset>>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const socket: WebSocket = new WebSocket(`${WEBSOCKET_BASE_URL}/assets/list?pageNum=2`)

    socket.addEventListener('message', (event) => {
      console.log('message', event.data)
      const res: {
        code: number
        data: Array<Asset>
      } = JSON.parse(event.data as string)
      if (res.code === 200) {
        setList(res.data)
      }
    })

    // TODO: If server ended causes connection failed, should close the websocket server.
    // socket.addEventListener('error', () => {
    //   setError('Failed. Please try again later....')
    // })

    return () => socket.close()
  }, [])

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
