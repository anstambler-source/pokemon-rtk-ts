import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {useGetEvolutionPokemonQuery, useGetImagesPokemonsEvolutionQuery} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";
import {setIsEvolution, setPokemon} from "../features/pokemon/pokemonSlice.ts";
import type {pokemonInfo} from "../utils/types";

function Evolution() {
    const speciesUrl = useAppSelector(state => state.pokemon.pokemonValue.speciesUrl)
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(speciesUrl, {
        skip: !speciesUrl
    });
    const dispatch = useAppDispatch();

    const names = data && extractNamesPokemonsEvolution(data)
    const {data: pokEvo, isLoading: isLoa, error: err} = useGetImagesPokemonsEvolutionQuery(names || [], {
        skip: !names?.length
    })

    const handleChoise = (pok: pokemonInfo) => {
        dispatch(setPokemon(pok))
        dispatch(setIsEvolution(false));
    }

        if(isLoading || isLoa) return <p>Loading...</p>
        if(error || !speciesUrl || err) return <p>Error</p>
        if(data)
      return  <div>
            <div className={`grid grid-cols-${names?.length + ''} gap-1`}>
                {names?.map(name => <p key={name}>{name}</p>)}
                {pokEvo?.map(pok => <img className={'cursor-pointer'} onClick={() => handleChoise(pok)} key={pok.name} src={pok.imgLarge || pok.imgSmall} alt={pok.name} />)}
            </div>
            <button className={'mt-8 size-fit border-b-amber-800 rounded-xl bg-gray-400 p-2 hover:bg-gray-500 text-white'} onClick={() => dispatch(setIsEvolution(false))}>Back</button>
        </div>
    ;
}

export default Evolution;