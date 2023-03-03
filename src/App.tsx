import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Routes from './Routes'
import GlobalStyles from './styles/GlobalStyles'


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes/>
      <GlobalStyles/>
    </BrowserRouter>
  )
}

export default App
