import { Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Student from '../pages/Student';
import Students from '../pages/Students';

import MyRoute from './MyRoute';


const MyRoutes = function() {
  return (
    <Routes>
      {/* <Route path='/' element={ <MyRoute /> }> 
        <Route path='/' element={<Login />} />
      </Route> */}
      
      <Route path='/' element={<MyRoute ><Students /></MyRoute>} />
      <Route path='/student/:id/edit' element={<MyRoute isClosed ><Student /></MyRoute>} />
      <Route path='/student' element={<MyRoute isClosed><Student /></MyRoute>} />
      <Route path='/photos/:id' element={<MyRoute isClosed><Photos /></MyRoute>} />
      <Route path='/login' element={<MyRoute ><Login /></MyRoute>} />
      <Route path='/register' element={<MyRoute ><Register /></MyRoute>} />

      <Route path='*' element={<MyRoute ><Page404 /></MyRoute>}/>
    </Routes>
  )
}


export default MyRoutes