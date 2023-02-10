import { configureStore, combineReducers } from '@reduxjs/toolkit'
import pokemonSlice from './features/pokemonSlice'
import currentPokemonSlice from './features/currentPokemonSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// use redux-persist library to avoid losing data on reload
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  pokemon: pokemonSlice,
  currentPokemon: currentPokemonSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
