import { useState } from 'react'
import ProductCard from './shared/components/ProductCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ProductCard />
    </div>
  )
}

export default App
