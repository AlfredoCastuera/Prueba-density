import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { fetchPokemon, selectPokemon, selectNext, selectPrevious } from '../Redux/features/pokemonSlice'
import { fetchPokemonByURL, selectCurrentPokemon } from '../Redux/features/currentPokemonSlice'
import  BarChart  from '../components/BarChart'
import { Container, Typography, Avatar, Paper, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import classes from './PokemonDetail.module.scss'

const PokemonDetail = () => {
  const currentPokemon = useAppSelector(selectCurrentPokemon);
  const theme = useTheme();
  console.log(currentPokemon);

  const stats = currentPokemon.stats.map((stat:any)=>stat.base_stat)
  const types= currentPokemon.types.map((type:any)=>type.type.name);

  function generateRandomColorHex() {
    return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
  }
  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.pokemonDetail_card}>
        <Avatar src={currentPokemon.sprites.front_default}  sx={{ width: 64, height: 64, bgcolor:theme.palette.primary.light }} />
        <Typography variant='h5' color={theme.palette.primary.main}>{currentPokemon.name}</ Typography>
        {Array.isArray(types) && types.map((type)=>{
          return (<Chip label={type} sx={{ bgcolor: generateRandomColorHex(), color: theme.palette.grey[100]}}/>)
        })}
        <Typography variant='body1' color={theme.palette.primary.main}>Number: {currentPokemon.order}</ Typography>
        <Typography variant='body1' color={theme.palette.primary.main}>Height: {currentPokemon.height}</ Typography>
        <Typography variant='body1' color={theme.palette.primary.main}>Weight: {currentPokemon.weight}</ Typography>
      </ Paper>
      <BarChart color={theme.palette.primary.light} borderColor={theme.palette.primary.dark} stats={stats}/>
    </Container>

  )
}

export default PokemonDetail