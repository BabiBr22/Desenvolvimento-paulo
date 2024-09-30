import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [pokemon, setPokemon] = useState(null)
  const [idPokemon, setIdPokemon] = useState(1)

  const carregarPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
    setPokemon(response.data)
  }

  const proximoPokemon = () => {
    setIdPokemon(idPokemon + 1)
  }

  const voltarPokemon = () => {
    setIdPokemon(idPokemon - 1)
  }

  carregarPokemon()

  return (
    <>
      <h1>Pokédex do Paulinho</h1>
      <h2>{pokemon?.name}</h2>
      <img src={pokemon?.sprites.front_default} width={200} />
      {idPokemon > 1 && <button onClick={voltarPokemon}>Voltar</button>}
      <button onClick={proximoPokemon}>Próximo</button>
    </>
  )
}

export default App
