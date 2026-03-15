import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {
    useGetEvolutionPokemonQuery,
    useGetImagesPokemonsEvolutionQuery
} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";
import type {pokemonInfo} from "../utils/types";
import {useEffect, useMemo} from "react";
import {toCapitalize} from "../utils/toCapitalize.ts";
import {useNavigate} from "react-router";
import {pages} from "../utils/constants.ts";
import {setPokemon} from "../features/pokemon/pokemonSlice.ts";

function Evolution() {
    const speciesUrl = useAppSelector(state => state.pokemon.pokemonValue.speciesUrl)
    const pokemon = useAppSelector(state => state.pokemon.pokemonValue);
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(speciesUrl, {
        skip: !speciesUrl
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (!speciesUrl) {
            navigate('/')
        }
    }, [speciesUrl])

    const names = useMemo(() => {
        if (!data) return [];
        return extractNamesPokemonsEvolution(data)
    }, [data]);

    const evolutionNames = useMemo(() => {
        return names.filter(p => p !== pokemon.name)
    }, [names, pokemon.name])

    const {data: pokEvo, isLoading: isLoa, error: err} = useGetImagesPokemonsEvolutionQuery(evolutionNames, {
        skip: !evolutionNames.length
    })

    const listPokemons = useMemo(() => {
        if (!pokEvo) return [];
        const list = pokEvo.filter(p => p.name !== pokemon.name)
        list.splice(names.indexOf(pokemon.name), 0, pokemon)
        return list;
    }, [names, pokEvo, pokemon])

    const handleChoise = (pok: pokemonInfo) => {
        dispatch(setPokemon(pok))
        navigate(`/${pages[1]}/${pok.name}`)
    }

        if(isLoading || isLoa) return <p className={'text-center text-3xl'}>Loading...</p>
        if(error || !speciesUrl || err) return <p className={'text-center text-3xl'}>Error</p>
        if(data && names?.length)
      return  <div>
            <div className={'grid gap-1 mt-8'} style={{gridTemplateColumns: `repeat(${names.length}, 1fr)`}}>
                {listPokemons.map(pok =>
                    <div key={pok.name} className={'flex flex-col items-center'}>
                        <p className={'py-2 px-4 opacity-80 text-2xl bg-yellow-300 rounded-md w-fit text-center text-pink-600'}>{toCapitalize(pok.name)}</p>
                        <img className={' cursor-pointer my-8 transition-transform duration-300 hover:scale-105'} onClick={() => handleChoise(pok)} src={pok.imgLarge || pok.imgSmall} alt={pok.name} />
                    </div>
                )}
            </div>
          {!listPokemons.length && <p className={'mb-10 text-center text-3xl'}>No evolution types</p>}
            <button className={'mx-auto block text-3xl mb-12 size-fit border-b-amber-800 rounded-xl bg-gray-400 p-2 hover:bg-gray-500 text-white'} onClick={() => navigate(`/${pages[1]}/${pokemon.name}`)}>Back</button>
        </div>
    ;
}

export default Evolution;