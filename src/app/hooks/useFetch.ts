


const fetching = ({inputValue}: any) => {
    
    const getPokemon = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
                .then(resp => resp.json())
                .then(pokemon => {
                  return {
                    name: pokemon.name,
                    img: pokemon.sprites.front_default
                  }
                })                      
      }

      return getPokemon()
  
}

export default fetching
