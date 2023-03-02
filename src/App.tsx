import { useState } from 'react'
import Login from './pages/login'
import GlobalStyles from './styles/GlobalStyles'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
      <GlobalStyles/>
    </>
  )
}

export default App
