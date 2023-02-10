import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getPokemon } from '../../services/pokemon'
import axios, { AxiosResponse } from 'axios'

export interface CurrentPokemonState {
  currentPokemon: any | null,
  status: 'idle'|'succesed'|'loading'|'rejected'
  error: string | null,
}

const initialState: CurrentPokemonState = {
  currentPokemon: null,
  status: 'idle',
  error: null,
}

// create a thunk function for featching the pokemon arry from the API

export const fetchPokemonByURL = createAsyncThunk('pokemon/fetchPokemonByURL', async (pokemonURL:string) => {
  const response = await axios.get(pokemonURL);
  return (response as AxiosResponse).data
});

export const CurrentPokemonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonByURL.pending, (state,action)=>{
      state.status = 'loading'
    })
    builder.addCase(fetchPokemonByURL.fulfilled, (state,action)=>{
      state.status = 'succesed'
      state.error = null,
      state.currentPokemon = action.payload
    })
    builder.addCase(fetchPokemonByURL.rejected, (state,action) =>{
      state.status = 'rejected',
      state.error = action.error.message as string
    })
  }
})

// Also export the selector callback
export const selectCurrentPokemon = (state : RootState) => state.currentPokemon.currentPokemon;

// Action creators are generated for each case reducer function
export const {  } = CurrentPokemonSlice.actions

// Export the reducer to register it in the store.
export default CurrentPokemonSlice.reducer