import { useEffect, useState } from 'react'
import Card from './components/card'
import { fetchAssetsList, Asset } from './utils/http'

function App() {
  const [list, setList] = useState<Array<Asset>>([])

  const getList = async () => {
    try {
      const res = await fetchAssetsList()
      setList(res)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div className="container p-10">
      <h1 className="container text-xl font-semibold">Cryptocurrency Realtime Price</h1>
      <div className="container flex flex-row flex-wrap w-200 mt-8">
        {list.map((item) => {
          return (
            <div className="basis-1/3 pr-4 mb-4" key={item.id}>
              <Card key={item.id} currency={item.currency} price={item.price} volume={item.volume}></Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
