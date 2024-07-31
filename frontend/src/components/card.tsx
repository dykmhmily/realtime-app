function Card({ currency, price, volume }: { currency: string; price: number; volume: number }) {
  return (
    <>
      <div className="container flex flex-col border rounded p-2">
        <h1 className="text-xl font-semibold">{currency}</h1>
        <div className="container text-orange-300">
          <label>${price}</label>
        </div>
        <div className="container text-sm text-gray-300">
          <label>volume: </label>
          <label>{volume}</label>
        </div>
      </div>
    </>
  )
}

export default Card
