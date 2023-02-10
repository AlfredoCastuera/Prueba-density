// import React, {useEffect,useState} from 'react'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { fetchPokemon, selectPokemon, selectNext, selectPrevious } from '../Redux/features/pokemonSlice'
import { fetchPokemonByURL, selectCurrentPokemon } from '../Redux/features/currentPokemonSlice'
import { useNavigate } from 'react-router-dom'

// Material UI components:
import { List, ListItem, Button, Modal, Box, Container, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Custom classes
import classes from './Pokedex.module.scss'


const Pokedex = () => {
  const theme = useTheme();
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
    dispatch(fetchPokemon(currentPage) as any);
  },[currentPage])

  const getPokemonByURL = (url:string) => {
    dispatch(fetchPokemonByURL(url) as any)
  }


  console.log(pokemon);
  return (
    <Container maxWidth="md" className={classes.pokedex_container}>
      {currentPokemon && <main className={classes.pokedex_card}>
        <Paper elevation={3} style={{
          padding:'1rem',
          minWidth:'fit-contnet',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
          }}>
          <Typography variant='h4' color={theme.palette.primary.main}>{currentPokemon.name}</ Typography>
          <img src={currentPokemon.sprites.front_default} alt="" />
        </Paper>
      </main>}
      <aside>
        <List className={classes.pokedex_list}>
          {Array.isArray(pokemon) && pokemon.map((current)=>{
            return <ListItem key={current.url}
            onClick={()=>{
              getPokemonByURL(current.url);
            }}
            onDoubleClick={
              ()=>{
                console.log('quires navegar a otra pagina')
                navigate(`/pokedex/${current.name}`);
              }
            }
            ><Button
              variant="outlined"
              size="small"
              fullWidth
              >
                {current.name}
              </Button>
            </ListItem>
          })}
        </List>
      </aside>
      <footer className={classes.pokedex_footer} >
        <div className={classes.pokedex_footer_buttons}>
          {previous && <Button className={classes.pokedex_footer_previous} variant="contained" onClick={decrement}>previous</Button>}
          {next && <Button className={classes.pokedex_footer_next} variant="contained" onClick={increment}>next</Button>}
        </div>
      </footer>
    </Container>

  )
}

export default Pokedex