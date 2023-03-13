import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { IStudent } from "../../interfaces/IStudent";
import axios from "../../services/axios";
import { store } from "../../store";
import * as actions from '../../store/isLoggedIn.store';
import { Container } from "../../styles/GlobalStyles";
import { Form, Title } from "./styled";

export default function Photos(): JSX.Element{
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [photo, setPhoto] = useState<string>('')

  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    async function getData(){
      try{
        setIsLoading(true)
        const data = await (await axios.get(`students/${id}`)).data as IStudent
        setPhoto(data.photos[0]?.url || '')
        setIsLoading(false)
      }catch(err: any){
        toast.error('Erro ao obter imagem')
        setIsLoading(false)
        navigate('/')
      }
    }

    getData()
  }, [id])

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    const photos = e.target?.files as FileList    
    
    const photoURL = URL.createObjectURL(photos?.[0])
    setPhoto(photoURL)

    const formData = new FormData()
    formData.append('student_id', id || '')
    formData.append('photo', photos?.[0] || '')

    try{
      setIsLoading(true)
      await axios.post('/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      toast.success('Foto carregada com sucesso')
      setIsLoading(false)
    }catch(err: any){
      setIsLoading(false)
      const errors = (err.response?.data?.errors) || [];

      if(err.response.status === 401){
        errors.map((error: any) => toast.error(error))
        navigate('/')
        store.dispatch(actions.logout())
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt='Foto' /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange}/>
        </label>
      </Form>
    </Container>
  )
}