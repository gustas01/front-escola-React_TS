import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Page404 from './pages/Page404';

const MyRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes>
  )
}


export default MyRoutes