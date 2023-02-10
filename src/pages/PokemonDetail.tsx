import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { fetchPokemon, selectPokemon, selectNext, selectPrevious } from '../Redux/features/pokemonSlice'
import { fetchPokemonByURL, selectCurrentPokemon } from '../Redux/features/currentPokemonSlice'

const PokemonDetail = () => {
  const currentPokemon = useAppSelector(selectCurrentPokemon);

  return (
    <div style={
      {
        display:'flex',
        gap: '2rem'
      }
    }>
      <p>pagina de detalle de pokemon</p>
      <p>{JSON.stringify(currentPokemon)}</p>
    </div>

  )
}

export default PokemonDetail