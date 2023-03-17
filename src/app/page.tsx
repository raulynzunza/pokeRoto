'use client'
import { ChangeEvent, useState } from "react"
import Image from 'next/image'
import fetching from "./hooks/useFetch"


interface Pokemon {
  name: string,
  url: string
}

interface Event {
  value: string
}

export const Home = () => {

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState({
    name: '',
    img: ''
  });

  const onInputChange = ({ target }: ChangeEvent<Event>) => {
    setInputValue(target.value)    
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return

    fetching()
    setIsLoading(false)

    setInputValue('')
  }

  const fetching = async () => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(resp => resp.json())
            .then(pokemon => {
              setPokemon({
                name: pokemon.name,
                img: pokemon.sprites.front_default
              })
            })            
      
  }


  return (
    <>    
      <form onSubmit={onSubmit}>
        <input
          type="text"          
          value={inputValue}
          onChange={onInputChange}
        />
      </form>

      {
        isLoading === true
        ?
          <div>Cargando...</div>
        :
          <Image 
            src={pokemon.img} 
            alt={pokemon.name} 
            width={500} 
            height={500}
          />
      }
    
    </>

  )
}
