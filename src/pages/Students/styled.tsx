import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {}

export const StudentContainer = styled.div <Props>`
  margin-top: 20px;

  div{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;

  }
`;

export const ProfilePicture = styled.div <Props>`
  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
     
  }
`;


export const NewStudentLink = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`