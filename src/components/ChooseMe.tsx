import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {
    pokemonApi,
    useGetAllPokemonsQuery,
    useLazyGetPokemonByNameQuery
} from "../features/api/pokemonApi.ts";
import {setError, setIsEvolution, setPokemon} from "../features/pokemon/pokemonSlice.ts";



const ChooseMe = () => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const normalizedPokemonName = pokemonName.trim().toLowerCase();
    const dispatch = useAppDispatch();
    const pokemon = useAppSelector(state => state.pokemon.pokemonValue)
    const error = useAppSelector(state => state.pokemon.error)
    const [fetchPokemon, {isLoading}] = useLazyGetPokemonByNameQuery();
    const {data} = useGetAllPokemonsQuery();
    const pokemonFromCache = useAppSelector(pokemonApi.endpoints.getPokemonByName.select(normalizedPokemonName));

    async function handleSend() {
        if (pokemonFromCache.data) {
            dispatch(setPokemon(pokemonFromCache.data));
            return;
        }

        try {
            const {data, error} = await fetchPokemon(normalizedPokemonName);
            if (error) {
                dispatch(setPokemon({}))
                dispatch(setError('Pokemon not found'));
                console.log('Wrong name of pokemon', error)
            } else {
                dispatch(setError(null));
                dispatch(setPokemon(data))
            }
        }catch(e){
            console.error('Error', e);
        }
        setPokemonName('')
        dispatch(setIsEvolution(false));
    }

    return (
        <div className={'mx-10'}>
            <label className={'flex justify-center items-center py-6 font-serif text-xl'}>Choose a Pokemon:
                <input
                    className={'bg-orange-200 rounded-md border-2 mx-4'}
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value.toUpperCase())}
                />
                <select
                    className={'bg-orange-200 rounded-md border-2 mx-4'}
                    onChange={(e) => setPokemonName(e.target.value)}
                    value={pokemonName}>
                    <option className={'bg-orange-200 rounded-md border-2 mx-4'}></option>
                    {!!data && data.results.map((pokemon) =>
                        <option className={'bg-orange-200 rounded-md border-2 mx-4'} key={pokemon.name}>{pokemon.name.toUpperCase()}</option>
                    )}
                </select>
                <button className={'border-3 border-orange-400 rounded-lg bg-orange-200 p-2 hover:bg-orange-300 text-gray-900'} onClick={handleSend}>Send</button>
            </label>
            <div className={'text-center'}>
                {isLoading && <p className={'text-3xl'}>Loading...</p>}
                {error && <p className={'text-3xl p-6'}>{error}</p>}
            </div>
            {!pokemon.name && <img className={'w-1/2 object-contain mx-auto'} src='../../public/pokemonVopros.png' alt='Unknown Pokemon' />}
        </div>
    )
}

export default ChooseMe;