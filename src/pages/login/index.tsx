import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isEmail from 'validator/es/lib/isEmail';
import axios from "../../services/axios";
import { store } from "../../store";
import * as actions from '../../store/isLoggedIn.store';

import { Container } from "../../styles/GlobalStyles";
import { Form } from './styled';

export default function Login(): JSX.Element{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


  const navigate = useNavigate()
  // const loginInformation = useSelector((state: RootState) => state.loggedInReducer)
  // console.log(loginInformation);
  
  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    
    let formErros = false;

    if(!isEmail(email)){
      formErros = true;
      toast.error('E-mail inválido')
    }

    if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))) || (password.length < 6 || password.length > 50)){
      formErros = true;
      toast.error('Senha inválida');
    }

    if(formErros) return
    
    try{
      const response = await axios.post('/tokens', {email, password}, {headers: {'Content-Type': 'application/json'}})
      store.dispatch(actions.loginSuccess(response.data))
      toast.success('Login com sucesso')
      
      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
      navigate('/')
    }catch(e){
      toast.error('Usuário ou senha inválidos')
      store.dispatch(actions.loginFailure())
    }
    // store.dispatch(actions.login({email, password}))
    // navigate('/')
  }

  return (
    <Container>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Seu e-mail'/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Sua senha'/>

        <button type="submit"> Entrar</button>
      </Form>
    </Container>
  )
}