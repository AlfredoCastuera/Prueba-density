import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getPokemon } from '../../services/pokemon'
import { AxiosResponse } from 'axios'
import { Action } from '@remix-run/router'

export interface PokemonState {
  pokemon: any[],
  status: 'idle'|'succesed'|'loading'|'rejected'
  error: string | null,
  next: string | null,
  previous:  string | null,
  count: number | null,
}

const initialState: PokemonState = {
  pokemon: [],
  status: 'idle',
  error: null,
  next: null,
  previous: null,
  count: null,
}

// create a thunk function for featching the pokemon arry from the API

export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async (currentPage:number=1) => {
  const response = await getPokemon(currentPage);
  return (response as AxiosResponse).data
});

export const pokemonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.pending, (state,action)=>{
      state.status = 'loading'
    })
    builder.addCase(fetchPokemon.fulfilled, (state,action)=>{
      state.status = 'succesed'
      state.error = null,
      state.pokemon = action.payload.results
      state.next = action.payload.next
      state.previous = action.payload.previous
      state.count = action.payload.count
    })
    builder.addCase(fetchPokemon.rejected, (state,action) =>{
      state.status = 'rejected',
      state.error = action.error.message as string
    })
  }
})

// Also export the selector callback
export const selectPokemon = (state : RootState) => state.pokemon.pokemon;
export const selectNext = (state: RootState) => state.pokemon.next;
export const selectPrevious = (state: RootState) => state.pokemon.previous

// Action creators are generated for each case reducer function
export const {  } = pokemonSlice.actions

// Export the reducer to register it in the store.
export default pokemonSlice.reducer