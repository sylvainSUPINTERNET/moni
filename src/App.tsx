import { useState } from 'react'
import './App.css'
import HistoryBattle from './components/history/history'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen">
      <HistoryBattle></HistoryBattle>
    </div>
  )
}

export default App
