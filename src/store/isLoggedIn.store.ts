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

    loginFailure(){
      localStorage.setItem('loggedInState', JSON.stringify(initialState))
      delete axios.defaults.headers.Authorization;
      return initialState
    }
  }
})


export const { loginRequest, loginSuccess, loginFailure } = loggedIn.actions
export default loggedIn.reducer



//disparar action de forma assíncrona
//provavelmente vou usar algo assim para carregar dados do usuário quando ele clicar no botão de login
//vou fazer aqui dentro o que for feito no SAGA
export function login(payload: {email: string, password: string}): AppThunk {
  return async function (dispatch: AppDispatch, getState){
    try{
      const response = await axios.post('/tokens', payload, {headers: {'Content-Type': 'application/json'}})
      console.log('indo chamar a action success');
      
      dispatch(loginSuccess(response.data))
      toast.success('Login com sucesso')
      
      axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
    }catch(e){
      toast.error('Usuário ou senha inválidos')
      dispatch(loginFailure())
    }
  }
}


export function register(payload: {name: string, email: string, password: string}) : AppThunk {
  return async function (dispatch: AppDispatch, getState){
    try{
      await axios.post('/users', payload)
      toast.success('Usuário cadastrado com sucesso!')
    }catch(e: any){
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