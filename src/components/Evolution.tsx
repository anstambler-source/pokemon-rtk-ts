import {useAppSelector} from "../hooks/hooks.ts";
import {useGetEvolutionPokemonQuery} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";

interface Props {
    handleEvolution: () => void
}

function Evolution({handleEvolution} : Props) {
    const speciesUrl = useAppSelector(state => state.pokemon.pokemonValue.speciesUrl)
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(speciesUrl, {
        skip: !speciesUrl
    });

    const names = data && extractNamesPokemonsEvolution(data)

        if(isLoading) return <p>Loading...</p>
        if(error || !speciesUrl) return <p>Error</p>
        if(data)
      return  <div>
            <div>
                {names?.map(name => <p key={name}>{name}</p>)}
            </div>
            <button onClick={handleEvolution}>Back</button>
        </div>
    ;
}

export default Evolution;