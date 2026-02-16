import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {useGetEvolutionPokemonQuery} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";
import {setIsEvolution} from "../features/pokemon/pokemonSlice.ts";

function Evolution() {
    const speciesUrl = useAppSelector(state => state.pokemon.pokemonValue.speciesUrl)
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(speciesUrl, {
        skip: !speciesUrl
    });
    const dispatch = useAppDispatch();

    const names = data && extractNamesPokemonsEvolution(data)

        if(isLoading) return <p>Loading...</p>
        if(error || !speciesUrl) return <p>Error</p>
        if(data)
      return  <div>
            <div>
                {names?.map(name => <p key={name}>{name}</p>)}
            </div>
            <button onClick={() => dispatch(setIsEvolution(false))}>Back</button>
        </div>
    ;
}

export default Evolution;