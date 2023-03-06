import { Navigate } from 'react-router-dom';

interface MyProps {
  isClosed?: boolean,
  children: JSX.Element | JSX.Element[];

}

export default function MyRoute({isClosed, children }: MyProps){
  const isLoggedIn = false;

  if(isClosed && !isLoggedIn){    
    return <Navigate to='/login' state={{prevPath: window.location.href}}/>
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