import { useState } from 'react'
import Header from './components/Header'
import Login from './pages/login'
import GlobalStyles from './styles/GlobalStyles'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Login/>
      <GlobalStyles/>
    </>
  )
}

export default App
