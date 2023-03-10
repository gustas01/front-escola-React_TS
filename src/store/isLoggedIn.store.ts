import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppDispatch, AppThunk } from '.';
import axios from '../services/axios';


type IState = {
  isLoggedIn: boolean,
  token: string,
  user: {id: number, name: string, email: string},
  isLoading: boolean
}

type IPayloadAction = {
  token: string,
  user: {id: number, name: string, email: string}
}

type IPayloadRegister = {
  id: number,
  name: string,
  email: string
}


const initialState: IState = {
  isLoggedIn: false,
  token: '',
  user: {id: 0, name: '', email: ''},
  isLoading: false
}

export const loggedIn = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<IPayloadAction>) {
      return state
    }, 

    loginSuccess(state, action: PayloadAction<IPayloadAction>) {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLoggedIn = true
      
      localStorage.setItem('loggedInState', JSON.stringify(state))
      return state
    }, 

    logout(){
      localStorage.setItem('loggedInState', JSON.stringify(initialState))
      delete axios.defaults.headers.Authorization;
      return initialState
    },
    updateSuccess(state, action: PayloadAction<IPayloadRegister>){
      state.user = action.payload
      localStorage.setItem('loggedInState', JSON.stringify(state))
      return state
    }
  }
})


export const { loginRequest, loginSuccess, logout, updateSuccess } = loggedIn.actions
export default loggedIn.reducer



//disparar action de forma assíncrona
//provavelmente vou usar algo assim para carregar dados do usuário quando ele clicar no botão de login
//vou fazer aqui dentro o que for feito no SAGA
export function login(payload: {email: string, password: string}): AppThunk {
  return async function (dispatch: AppDispatch, getState){
    try{
      const response = await axios.post('/tokens', payload, {headers: {'Content-Type': 'application/json'}})      
      dispatch(loginSuccess(response.data))
      toast.success('Login com sucesso')
      
      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
    }catch(e){
      toast.error('Usuário ou senha inválidos')
    }
  }
}


export function register(payload: {id: number, name: string, email: string, password: string}) : AppThunk {
  return async function (dispatch: AppDispatch, getState){
    const { id, name, email, password } = payload
    try{
      if(!id){
        await axios.post('/users', {name, email, password}, {headers: {'Content-Type': 'application/json'}})
        toast.success('Usuário cadastrado com sucesso!')
      }
      else{
        await axios.put('/users', {name, email, password})
        if(email !== getState().loggedInReducer.user.email){
          // chamar action de deslogar
          console.log(getState().loggedInReducer.user.email);
        }
        dispatch(updateSuccess({id, name, email}))
        
        toast.success('Usuário atualizado com sucesso!')
      }
    }catch(e: any){
      if(e.response.status === 401){
        // chamar action de deslogar
      }
      const errors = (e.response?.data?.errors) || [];
      errors.map((error: any) => toast.error(error))
    }
  }
}

export const loadStateWhenStarts = () => {
  if(localStorage.getItem('loggedInState')){
    const state = JSON.parse(localStorage.getItem('loggedInState') || '') as IState
    axios.defaults.headers.Authorization = `Bearer ${state.token}`
    return state
  }
}


//2ª forma de fazer - depois testar se dessa forma funciona também
// export const loadDataWhenLogin2 = createAsyncThunk('asyncIncrement',
//   async function(dispatch: AppDispatch, getState){
//     return dispatch(loginRequest(payload))
// })