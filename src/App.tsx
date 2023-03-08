import { Provider } from 'react-redux/es/exports';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';

import { store } from './store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes/>
        <GlobalStyles/>
        <ToastContainer autoClose={3000} className='toast-container'/>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App
