import { get } from 'lodash';
import { useEffect, useState } from "react";
import { FaEdit, FaUserCircle, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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


  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Students</h1>

      <StudentContainer>
        {students.map(student => (
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
            <Link to={`student/${student.id}/delete`}> <FaWindowClose size={16}/> </Link>
          </div>
        ))}
      </StudentContainer>

    </Container>
  )
}