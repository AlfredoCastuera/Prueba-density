import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2/'

const axiosInstance = axios.create({
  baseURL: BASE_URL
})

export const getPokemon = async (currentPage:number = 1) => {
  const offset = (currentPage - 1 )*20
  try{
    const pokemon = await axiosInstance.get(`/pokemon/?offset=${offset}&limit=20`);
    return pokemon
  } catch(err){
      console.log(err)
  }
}
export const getPokemonById = async (id:string) => {
  try{
    const pokemon = await axiosInstance.get(`/${id}`);
    return pokemon
  } catch(err){
      console.log(err)
  }
}

export default axiosInstance;