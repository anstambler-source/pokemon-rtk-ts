import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {
    pokemonApi,
    useGetAllPokemonsQuery,
    useLazyGetPokemonByNameQuery
} from "../features/api/pokemonApi.ts";
import {setError, setIsEvolution, setPokemon} from "../features/pokemon/pokemonSlice.ts";
import {bg_orange} from "../utils/constants.ts";


const ChooseMe = () => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const normalizedPokemonName = pokemonName.trim().toLowerCase();
    const dispatch = useAppDispatch();
    const {pokemonValue : pokemon, error} = useAppSelector(state => state.pokemon);
    const [fetchPokemon, {isLoading}] = useLazyGetPokemonByNameQuery();
    const {data} = useGetAllPokemonsQuery();
    const pokemonFromCache = useAppSelector(pokemonApi.endpoints.getPokemonByName.select(normalizedPokemonName));

    async function handleSend() {
        if (pokemonFromCache.data) {
            dispatch(setPokemon(pokemonFromCache.data));
            dispatch(setIsEvolution(false));
            setPokemonName('')
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
        } catch (e) {
            console.error('Error', e);
        }
        setPokemonName('')
        dispatch(setIsEvolution(false));
    }

    return (
        <div className={'mx-10'}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target instanceof HTMLSelectElement) {
                          e.preventDefault();
                          handleSend();
                      }
                  }}>
                <div className={'flex justify-center items-center py-6 font-serif text-xl'}>
                <label className={'text-red-600 bg-amber-200 rounded-lg p-2 opacity-80 font-semibold'}>Choose a Pokemon:</label>
                    <input
                        className={bg_orange}
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value.toUpperCase())}
                    />
                    <select
                        className={bg_orange}
                        onChange={(e) => setPokemonName(e.target.value)}
                        value={pokemonName}>
                        <option className={bg_orange}></option>
                        {!!data && data.results.map((pokemon) =>
                            <option className={bg_orange}
                                    key={pokemon.name}>{pokemon.name.toUpperCase()}</option>
                        )}
                    </select>
                    <button className={'border-2 opacity-80 rounded-lg bg-green-400 p-2 hover:bg-green-500 text-gray-900'}
                        >Send
                    </button>
                </div>
            </form>
            <div className={'text-center text-3xl'}>
                {isLoading && <p>Loading...</p>}
                {error && <p className={'p-6'}>{error}</p>}
            </div>
            {!pokemon.name && <img className={'w-1/2 object-contain mx-auto'} src='../../public/pokemonVopros.png'
                                   alt='Unknown Pokemon'/>}
        </div>
    )
}

export default ChooseMe;