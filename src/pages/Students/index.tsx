import { get } from 'lodash';
import { useEffect, useState } from "react";
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

import { IStudent } from "../../interfaces/IStudent";
import axios from "../../services/axios";
import { Container } from "../../styles/GlobalStyles";
import { ProfilePicture, StudentContainer } from "./styled";

export default function Students(): JSX.Element{
  const [students, setStudents] = useState<IStudent[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)


  useEffect(() => {
    async function getData(){
      setIsLoading(true)
      const response = await axios.get('/students');
      setStudents(response.data);
      setIsLoading(false)
    }

    getData()
  }, [])

  async function handleDelete(event: React.MouseEvent, id: number, index: number){
    try{
      event.preventDefault()
      setIsLoading(true)
      await axios.delete(`/students/${id}`)
      const newStudents = [...students]
      newStudents.splice(index, 1)
      setStudents(newStudents)
      setIsLoading(false)
    }catch(err: any){
      if(err.response.status === 401){
        toast.warn('Você precisa fazer login para executar essa ação')
      }
      else
      toast.error('Erro ao excluir aluno')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Students</h1>

      <StudentContainer>
        {students.map((student, index) => (
          <div key={student.id}>
            <ProfilePicture>
              {get(student, 'photos[0].url', false) ? 
                (<img src={student.photos[0].url} alt="" />) : 
                (<FaUserCircle size={36}/>)
              }            
            </ProfilePicture>

            <span>{student.first_name}</span>
            <span>{student.email}</span>

            <Link to={`student/${student.id}/edit`}> <FaEdit size={16}/> </Link>
            <Link to={`student/${student.id}/delete`} onClick={e => handleDelete(e, student.id, index)}> <FaWindowClose size={16}/> </Link>
          </div>
        ))}
      </StudentContainer>

    </Container>
  )
}