import { useEffect, useState } from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import validator from 'validator';
import Loading from '../../components/Loading';
import { IStudent } from '../../interfaces/IStudent';
import axios from '../../services/axios';
import { store } from '../../store';
import * as actions from '../../store/isLoggedIn.store';
import { Container } from "../../styles/GlobalStyles";
import { Form, ProfilePicture, Title } from './styled';

export default function Student(): JSX.Element{
  const {id} = useParams()
  const navigate = useNavigate()
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<string>('')

  console.log(id);
  
  useEffect(() => {
    if(!id) return

    async function getData(){
      try{
        setIsLoading(true)
        const data  = await (await axios.get(`/students/${id}`)).data as IStudent 
        setPhoto(data?.photos[0]?.url)
        
        setFirst_name(data.first_name)
        setLast_name(data.last_name)
        setEmail(data.email)
        setAge(String(data.age))
        setWeight(String(data.weight))
        setHeight(String(data.height))

        setIsLoading(false)
      }catch(err: any){
        setIsLoading(false)
        const errors = (err.response?.data?.errors) || [];

        if(err.response.status === 400){
          errors.map((error: any) => toast.error(error))
          navigate('/')
        }
      }

    }

    getData()

  }, [])

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()
    let formErros = false;

    if(first_name.length < 3 || first_name.length > 255){
      formErros = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres')
    }

    if(last_name.length < 3 || last_name.length > 255){
      formErros = true;
      toast.error('O sobrenome deve ter entre 3 e 255 caracteres')
    }

    if(!validator.isEmail(email)){
      formErros = true;
      toast.error('E-mail inválido')
    }

    if(!validator.isInt(String(age))){
      formErros = true;
      toast.error('Idade inválida')
    }

    if(!validator.isFloat(String(weight))){
      formErros = true;
      toast.error('Peso inválido')
    }

    if(!validator.isFloat(String(height))){
      formErros = true;
      toast.error('Altura inválido')
    }


    if(formErros) return

    try{
      setIsLoading(true)
      if(id){
        await axios.put(`/students/${id}`, {
          first_name, 
          last_name,
          email,
          age,
          weight,
          height
        })

        toast.success('Aluno editado com sucesso')
      } else {
        const data = await (await axios.post(`/students/`, {
          first_name,
          last_name,
          email,
          age,
          weight,
          height
        })).data as IStudent
  
        toast.success('Aluno criado com sucesso')
        navigate(`${data.id}/edit`)
      }
      setIsLoading(false)
    }catch(err: any){
      const errors = (err.response?.data?.errors) || [];
      if(errors.length > 0)
        errors.map((error: any) => toast.error(error))
      else
        toast.error('Erro desconhecido')

      if(err.response.status === 401){
        store.dispatch(actions.logout())
      }
    }

  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>

      <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          { photo ? <img src={photo} alt={first_name} /> : <FaUserCircle size={180}/> }
          <Link to={`/photos/${id}`}> 
            <FaEdit size={24}/>
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <input type="text" value={first_name} onChange={e => setFirst_name(e.target.value)} placeholder='Primeiro nome'/>
        <input type="text" value={last_name} onChange={e => setLast_name(e.target.value)} placeholder='Sobrenome'/>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='E-mail'/>
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder='Idade'/>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder='Peso'/>
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder='Altura'/>
        
        <button type='submit'>Enviar</button>
      </Form>
    </Container>
  )
}