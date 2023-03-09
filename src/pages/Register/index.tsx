import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isEmail from 'validator/es/lib/isEmail';
import Loading from "../../components/Loading";
import { RootState, store } from "../../store";
import * as actions from '../../store/isLoggedIn.store';
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

export default function Register(): JSX.Element{
  const user =  useSelector((state: RootState) => state.loggedInReducer.user)
  const { isLoggedIn } =  useSelector((state: RootState) => state.loggedInReducer)

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    
    let formErros = false;

    if(name.length < 3 || name.length > 255){
      formErros = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres')
    }

    if(!user.id && (password.length < 6 || password.length > 50)){
      formErros = true;
      toast.error('A senha deve ter entre 6 e 50 caracteres')
    }
    
    if (!user.id && (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password))))){
      formErros = true;
      toast.error('A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula');
    }

    if(!isEmail(email)){
      formErros = true;
      toast.error('E-mail inválido')
    }


    if(formErros) return

    setIsLoading(true)
    store.dispatch(actions.register({name, email, password, id: user.id}))  
    setIsLoading(false)
          
    if(isLoggedIn) return 

    navigate('/login')

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>{isLoggedIn ? 'Editar dados' : 'Crie sua conta'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Seu nome'/>
        </label>
        
        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Seu email'/>
        </label>
        
        <label htmlFor="password">
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Sua senha'/>
        </label>

        <button type="submit">{isLoggedIn ? 'Salvar' : 'Criar conta'}</button>
      </Form>
    </Container>
  )
}