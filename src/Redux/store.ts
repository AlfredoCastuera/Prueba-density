import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import pokemonSlice from './features/pokemonSlice'
import currentPokemonSlice from './features/currentPokemonSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemon: pokemonSlice,
    currentPokemon: currentPokemonSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch