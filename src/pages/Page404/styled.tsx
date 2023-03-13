import styled from 'styled-components';

type Props = {
  isRed: boolean
}


export const Title = styled.h1 <Props>`
background-color: bisque;
  small {
    color: yellow;
    /* background-color: ${(props: Props) => props.isRed ? 'red' : 'blue'}; */
    background-color: red;
  }
`