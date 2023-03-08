import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isEmail from 'validator/es/lib/isEmail';
import axios from "../../services/axios";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

export default function Register(): JSX.Element{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    
    let formErros = false;

    if(name.length < 3 || name.length > 255){
      formErros = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres')
    }

    if(password.length < 6 || password.length > 50){
      formErros = true;
      toast.error('A senha deve ter entre 6 e 50 caracteres')
    }
    
    if (!((/[A-Z]/).test(password) && ((/[a-z]/).test(password)))){
      formErros = true;
      toast.error('A senha deve ter pelo menos 1 letra maiúscula e 1 minúscula');
    }

    if(!isEmail(email)){
      formErros = true;
      toast.error('E-mail inválido')
    }


    if(formErros) return

    try{
      await axios.post('/users', {name, email, password})
   
      toast.success('Usuário cadastrado com sucesso!')
      navigate('/login')
      
    }catch(e: any){
      const errors = (e.response?.data?.errors) || [];
      
      errors.map((error: any) => toast.error(error))
    }

  }

  return (
    <Container>
      <h1>Crie sua conta</h1>

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

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  )
}