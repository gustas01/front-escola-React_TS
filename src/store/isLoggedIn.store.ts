import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../services/axios';


type IState = {
  isLoggedIn: boolean,
  token: string,
  user: {id: number, email: string},
  isLoading: boolean
}

type IPayloadAction = {
  token: string,
  user: {id: number, email: string}
}


const initialState: IState = {
  isLoggedIn: false,
  token: '',
  user: {id: 0, email: ''},
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
// export function login(payload: {email: string, password: string}): AppThunk {
//   return async function (dispatch: AppDispatch, getState){
//     try{
//       const response = await axios.post('/tokens', payload, {headers: {'Content-Type': 'application/json'}})
//       dispatch(loginSuccess(response.data))
//       toast.success('Login com sucesso')
      
//       axios.defaults.headers.Authorization = `Bearer ${response.data.token}`
//     }catch(e){
//       toast.error('Usuário ou senha inválidos')
//       dispatch(loginFailure())
//     }
//   }
// }

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