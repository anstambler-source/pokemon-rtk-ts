import {
    useGetEvolutionPokemonQuery,
    useGetImagesPokemonsEvolutionQuery, useGetPokemonByNameQuery
} from "../features/api/pokemonApi.ts";
import {extractNamesPokemonsEvolution} from "../utils/extractNamesPokemonsEvolution.ts";
import type {pokemonInfo} from "../utils/types";
import {useEffect, useMemo} from "react";
import {toCapitalize} from "../utils/toCapitalize.ts";
import {useNavigate, useParams} from "react-router";
import {pages} from "../utils/constants.ts";
import {setError} from "../features/pokemon/pokemonSlice.ts";
import {useAppDispatch} from "../hooks/hooks.ts";

function Evolution() {
    const {pokemonId = ''} = useParams()
    const {data: pokemonData, isLoading: isLoad, error: erro} = useGetPokemonByNameQuery(pokemonId)
    const {data, isLoading, error} = useGetEvolutionPokemonQuery(pokemonData ? pokemonData.speciesUrl : '');
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoad && erro) {
            dispatch(setError('Pokemon not found'))
            navigate('/*')
            return
        }
    }, [dispatch, erro, isLoad, navigate, pokemonData])

    const names = useMemo(() => {
        if (!data) return [];
        return extractNamesPokemonsEvolution(data)
    }, [data]);

    const evolutionNames = useMemo(() => {
        return names.filter(p => p !== pokemonData?.name)
    }, [names, pokemonData?.name])

    const {data: pokEvo, isLoading: isLoa, error: err} = useGetImagesPokemonsEvolutionQuery(evolutionNames, {
        skip: !evolutionNames.length
    })

    const listPokemons = useMemo(() => {
        if (!pokEvo) return [];
        const list = pokEvo.filter(p => p.name !== pokemonData?.name)
        if (pokemonData) list.splice(names.indexOf(pokemonData.name), 0, pokemonData)
        return list;
    }, [names, pokEvo, pokemonData])

    const handleChoise = (pok: pokemonInfo) => {
        navigate(`/${pages[0]}/${pok.name}`)
    }

        if(isLoading || isLoad || isLoa) return <p className={'text-center text-3xl'}>Loading...</p>
        if(error || erro || !pokemonData?.speciesUrl || err) return <p className={'text-center text-3xl'}>Error</p>
        if(data && names?.length)
      return  <div>
            <div className={'grid gap-1 mt-8'} style={{gridTemplateColumns: `repeat(${names.length}, 1fr)`}}>
                {listPokemons.map(pok =>
                    <div key={pok.name} className={'flex flex-col items-center'}>
                        <p className={'py-2 px-4 opacity-80 text-2xl bg-yellow-300 rounded-md w-fit text-center text-pink-600'}>{toCapitalize(pok.name)}</p>
                        <img className={'max-w-[66%] cursor-pointer my-8 transition-transform duration-300 hover:scale-105'} onClick={() => handleChoise(pok)} src={pok.imgLarge || pok.imgSmall} alt={pok.name} />
                    </div>
                )}
            </div>
          {!listPokemons.length && <p className={'mb-10 text-center text-3xl'}>No evolution types</p>}
            <button className={'mx-auto block text-3xl mb-12 size-fit border-b-amber-800 rounded-xl bg-gray-400 p-2 hover:bg-gray-500 text-white'} onClick={() => navigate(`/${pages[0]}/${pokemonId}`)}>Back</button>
        </div>
    ;
}

export default Evolution;