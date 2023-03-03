import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Page404 from '../pages/Page404';
import MyRoute from './MyRoute';

const MyRoutes = function() {
  return (
    <Routes>
      {/* <Route path='/' element={ <MyRoute /> }> 
        <Route path='/' element={<Login />} />
      </Route> */}
      
      <Route path='/' element={<MyRoute ><Login /></MyRoute>} />
      <Route path='*' element={<MyRoute ><Page404 /></MyRoute>}/>
    </Routes>
  )
}


export default MyRoutes