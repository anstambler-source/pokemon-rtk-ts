import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {setError, setPokemon} from "../features/pokemon/pokemonSlice.ts";
import {toCapitalize} from "../utils/toCapitalize.ts";
import {useValidPokemon} from "../hooks/validPokemon.ts";
import {useGetPokemonByNameQuery} from "../features/api/pokemonApi.ts";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {pages} from "../utils/constants.ts";

function IChooseYou() {
    const {pokemonValue: pokemon} = useAppSelector(state => state.pokemon)
    const dispatch = useAppDispatch()
    const {pokemonId, isValidPokemon} = useValidPokemon()
    const navigate = useNavigate()
    const {data, isLoading, error} = useGetPokemonByNameQuery(pokemonId, {
        skip: !isValidPokemon,
    })

    useEffect(() => {
        if (error || !isValidPokemon) {
            dispatch(setPokemon({}))
            dispatch(setError('Pokemon not found'))
            navigate('/')
            return;
        }
        if (data) {
            dispatch(setError(null))
            dispatch(setPokemon(data))
            return;
        }
    }, [data, dispatch, error, isValidPokemon, navigate])

    if (isLoading)
        return <p className={'text-center text-3xl'}>Loading...</p>

    if (pokemon.name)
        return (
            <div className={'m-10 flex justify-center gap-20 items-center font-serif text-lg'}>
                <div className={'flex flex-col space-y-3 bg-orange-100/50 p-6 rounded-xl shadow-md text-2xl'}>
                    <p>Type: {toCapitalize(pokemon.type)}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                </div>
                <div className={'flex flex-col items-center'}>
                    <p className={'py-2 px-4 opacity-80 text-5xl bg-yellow-300 rounded-md w-fit text-center text-pink-600'}>{toCapitalize(pokemon.name)}</p>
                    <img className={'w-full my-8'} src={pokemon.imgLarge || pokemon.imgSmall} alt={pokemon.name}/>
                    <button
                        className={'opacity-80 size-fit border-b-amber-800 rounded-xl bg-cyan-300 p-2 hover:bg-cyan-400 text-gray-900'}
                        onClick={() => navigate(`/${pages[2]}/${pokemon.name}`)}>Evolution
                    </button>
                </div>
            </div>
        )
}

export default IChooseYou;