import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {useGetEvolutionPokemonQuery, useGetImagesPokemonsEvolutionQuery} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";
import {setIsEvolution, setPokemon} from "../features/pokemon/pokemonSlice.ts";
import type {pokemonInfo} from "../utils/types";
import {useMemo} from "react";
import {toCapitalize} from "../utils/toCapitalize.ts";

function Evolution() {
    const speciesUrl = useAppSelector(state => state.pokemon.pokemonValue.speciesUrl)
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(speciesUrl, {
        skip: !speciesUrl
    });
    const dispatch = useAppDispatch();

    const names = useMemo(() => {
        if (!data) return [];
        return extractNamesPokemonsEvolution(data)
    }, [data]);

    const {data: pokEvo, isLoading: isLoa, error: err} = useGetImagesPokemonsEvolutionQuery(names || [], {
        skip: !names?.length
    })

    const handleChoise = (pok: pokemonInfo) => {
        dispatch(setPokemon(pok))
        dispatch(setIsEvolution(false));
    }

        if(isLoading || isLoa) return <p>Loading...</p>
        if(error || !speciesUrl || err) return <p>Error</p>
        if(data && names?.length)
      return  <div>
            <div className={'grid gap-1 mt-8'} style={{gridTemplateColumns: `repeat(${names.length}, 1fr)`}}>
                {pokEvo?.map(pok => (
                    <div key={pok.name} className={'flex flex-col items-center'}>
                        <p className={'py-2 px-4 opacity-80 text-2xl bg-yellow-300 rounded-md w-fit text-center text-pink-600'}>{toCapitalize(pok.name)}</p>
                        <img className={'cursor-pointer my-8 transition-transform duration-300 hover:scale-105'} onClick={() => handleChoise(pok)} src={pok.imgLarge || pok.imgSmall} alt={pok.name} />
                    </div>
                ))}
            </div>
            <button className={'mx-auto block text-3xl mb-12 size-fit border-b-amber-800 rounded-xl bg-gray-400 p-2 hover:bg-gray-500 text-white'} onClick={() => dispatch(setIsEvolution(false))}>Back</button>
        </div>
    ;
}

export default Evolution;