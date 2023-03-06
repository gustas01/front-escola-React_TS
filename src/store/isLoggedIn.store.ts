import { createSlice } from '@reduxjs/toolkit';

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