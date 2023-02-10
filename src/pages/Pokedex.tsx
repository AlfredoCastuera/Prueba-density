// import React, {useEffect,useState} from 'react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { fetchPokemon, selectPokemon, selectNext, selectPrevious } from '../Redux/features/pokemonSlice'
import { fetchPokemonByURL, selectCurrentPokemon } from '../Redux/features/currentPokemonSlice'
import { useNavigate } from 'react-router-dom'


const Pokedex = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(selectPokemon)
  const next = useAppSelector(selectNext)
  const previous = useAppSelector(selectPrevious)
  const currentPokemon = useAppSelector(selectCurrentPokemon);


  const [currentPage,setCurrentPage] = useState<number>(1);
  const increment = () => setCurrentPage(prev => prev+1);
  const decrement = () => setCurrentPage(prev => prev-1)

  useEffect(()=>{
    dispatch(fetchPokemon(currentPage));
  },[currentPage])

  // const [currentPokemonURL, setCurrentPokemonURL] = useState<string|null>(null)
  // useEffect(()=>{
  //   if(currentPokemonURL) dispatch(fetchPokemonByURL(currentPokemonURL));
  // },[currentPokemonURL]);

  const getPokemonByURL = (url:string) => {
    dispatch(fetchPokemonByURL(url))
  }

  console.log(pokemon);
  return (
    <div style={
      {
        display:'flex',
        gap: '2rem'
      }
    }>
      <main>
        <ul>
          {Array.isArray(pokemon) && pokemon.map((current)=>{
            return <li key={current.url}
            onClick={()=>{
              getPokemonByURL(current.url);
            }}
            onDoubleClick={
              ()=>{
                console.log('quires navegar a otra pagina')
                navigate(`/pokedex/${current.name}`);
              }
            }
            >{current.name}</li>
          })}
        </ul>
        {next && <button onClick={increment}>next</button>}
        {previous && <button onClick={decrement}>previous</button>}
      </main>
      {currentPokemon && <aside>
        <p>{JSON.stringify(currentPokemon.sprites.front_default)}</p>
        <img src={currentPokemon.sprites.front_default} alt="" />
      </aside>}
    </div>

  )
}

export default Pokedex