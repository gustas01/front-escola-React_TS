import { Container } from "../../styles/GlobalStyles"
import { Title } from "./styled"

export default function Login(){
  return (
    <Container>
    <Title isRed={false}>
      Login
      <small>Oi</small>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias porro accusantium suscipit corporis ducimus, optio possimus fugit nulla voluptas culpa quasi! Assumenda officia atque, ab dolore ducimus alias repellat aut.</p>
      <button type="button">Enviar</button>
    </Title>
    </Container>
  )
}