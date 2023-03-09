import { Loader, LoaderContainer } from './styled'

type Props = {
  isLoading: boolean
}

export default function Loading(props: Props){
  if(!props.isLoading) return <></>
  return(
    <LoaderContainer>
      <Loader/>
    </LoaderContainer>
  )
}

Loading.defaultProps = {
  isLoading: false
}