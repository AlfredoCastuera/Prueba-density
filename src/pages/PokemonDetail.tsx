import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { selectCurrentPokemon, selectError, fetchPokemonByName } from '../Redux/features/currentPokemonSlice'
import  BarChart  from '../components/BarChart'
import { Container, Typography, Avatar, Paper, Chip } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate} from 'react-router-dom'
import classes from './PokemonDetail.module.scss'

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentPokemon = useAppSelector(selectCurrentPokemon);
  const currentError = useAppSelector(selectError);
  const theme = useTheme();

  const stats = currentPokemon.stats.map((stat:any)=>stat.base_stat)
  const types = currentPokemon.types.map((type:any)=>type.type.name);

  function generateRandomColorHex() {
    return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
  }

  useEffect(()=>{
    dispatch(fetchPokemonByName(name as string) as any);
  },[name]);

  useEffect(()=>{
    if(currentError === "Request failed with status code 404") navigate('/');
  },[currentError])

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className={classes.pokemonDetail_card}>
        <header className={classes.pokemonDetail_header}>
          <Avatar src={currentPokemon.sprites.front_default}  sx={{ width: 64, height: 64, bgcolor:theme.palette.primary.light }} />
          <Typography variant='h5' color={theme.palette.primary.main}>{currentPokemon.name}</ Typography>
        </header>
        <main className={classes.pokemonDetail_main}>
          {Array.isArray(types) && types.map((type)=>{
            return (<Chip label={type} sx={{ bgcolor: generateRandomColorHex(), color: theme.palette.grey[100]}} key={type}/>)
          })}
        </main>
        <footer className={classes.pokemonDetail_footer}>
          <Typography variant='body1' color={theme.palette.primary.main}>Number: {currentPokemon.order}</ Typography>
          <Typography variant='body1' color={theme.palette.primary.main}>Height: {currentPokemon.height}</ Typography>
          <Typography variant='body1' color={theme.palette.primary.main}>Weight: {currentPokemon.weight}</ Typography>
        </footer>
      </ Paper>
      <div style={{height:"60vh"}}>
        <BarChart color={theme.palette.primary.light} borderColor={theme.palette.primary.dark} stats={stats}/>
      </div>
    </Container>

  )
}

export default PokemonDetail