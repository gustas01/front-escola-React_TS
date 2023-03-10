import { FaCircle, FaHome, FaPowerOff, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState, store } from '../../store';
import { Nav } from "./styled";

import * as actions from '../../store/isLoggedIn.store';

export default function Header(): JSX.Element{
  const { isLoggedIn } = useSelector((state: RootState) => state.loggedInReducer)
  
  const navigate = useNavigate()

  function handleLogout(e: React.MouseEvent){
    e.preventDefault()
    store.dispatch(actions.logout())
    navigate('/')
  }
  
  return (
    <Nav>
      <Link to='/'><FaHome size={24}/></Link>
      <Link to='/register'><FaUserAlt size={24}/></Link>
      { isLoggedIn ? 
      <Link to='/logout' onClick={handleLogout}><FaPowerOff size={24}/></Link> :
      <Link to='/login'><FaSignInAlt size={24}/></Link>
      }

      {isLoggedIn && <FaCircle size={24} color='#66ff33'/>}
    </Nav>
    )
}