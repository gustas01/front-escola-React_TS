// import { useLocation } from 'react-router-dom';
import { Container } from "../../styles/GlobalStyles";

export default function Page404(){
  // const location2 = useLocation()
  // console.log(location2.pathname); //endereço sem a baseURL
  // console.log(window.location.href); //endereço todo
  
  return (
   <Container>
    <h1>Erro 404</h1>
   </Container>
  )
}