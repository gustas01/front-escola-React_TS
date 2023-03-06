import { createSlice } from '@reduxjs/toolkit';
import axios from '../services/axios';
import { AppDispatch, AppThunk } from './index';

const initialState: any[] = []

export const loggedIn = createSlice({
  name: 'stock',
  initialState: initialState,
  reducers: {
    increment() {

    }, 
    drecrement(){

    }
  }
})


export const { increment, drecrement } = loggedIn.actions
export default loggedIn.reducer


//disparar action de forma assíncrona
//provavelmente vou usar algo assim para carregar dados do usuário quando ele clicar no botão de login
//vou fazer aqui dentro o que for feito no SAGA no curso
export function loadDataWhenLogin(): AppThunk {
  return async function (dispatch: AppDispatch, getState){
    await axios.get('/students')
    dispatch(increment())
  }
}


//2ª forma de fazer - depois testar se dessa forma funciona também
// export const loadDataWhenLogin2 = createAsyncThunk('asyncIncrement',
//   async function(dispatch: AppDispatch, getState){
//     dispatch(increment())
// })