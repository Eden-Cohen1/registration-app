import { useState } from 'react'
import Login from './components/Login'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='h-screen w-full flex justify-center bg-secondary'>
        <Login/>
      </main>
    </>
  )
}

export default App
