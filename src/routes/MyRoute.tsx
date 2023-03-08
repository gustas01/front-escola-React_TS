import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store';

interface MyProps {
  isClosed?: boolean,
  children: JSX.Element | JSX.Element[];
}



export default function MyRoute({isClosed, children }: MyProps){
  const loginInformation = useSelector((state: RootState) => state.loggedInReducer)
  
  const isLoggedIn = loginInformation.isLoggedIn;

  if(isClosed && !isLoggedIn){    
    return <Navigate to='/login' />
  }
  return <>{children}</>
}

MyRoute.defaultProps = {
  isClosed: false
}

// import { useLocation } from 'react-router-dom';
// const location2 = useLocation()
// console.log(location2.pathname); //endereço sem a baseURL
// console.log(window.location.href); //endereço todo