import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {
    useGetAllPokemonsQuery,
} from "../features/api/pokemonApi.ts";
import {setAllPokemons} from "../features/pokemon/pokemonSlice.ts";
import {bg_orange, pages} from "../utils/constants.ts";
import {useNavigate} from "react-router";


const ChooseMe = () => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const normalizedPokemonName = pokemonName.trim().toLowerCase();
    const dispatch = useAppDispatch();
    const {pokemonValue: pokemon, error} = useAppSelector(state => state.pokemon);
    const {data} = useGetAllPokemonsQuery();

    useEffect(() => {
        if (data) dispatch(setAllPokemons(data));
    }, [data, dispatch])

    const navigate = useNavigate()

    function handleSend() {
        setPokemonName('')
        navigate(`${pages[1]}/${normalizedPokemonName}`)
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
                    <label className={'text-black bg-purple-300 rounded-lg p-2 opacity-80 font-semibold'}>Choose a
                        Pokemon:</label>
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
                        {!!data && data.map((pokemon) =>
                            <option className={bg_orange}
                                    key={pokemon}>{pokemon.toUpperCase()}</option>
                        )}
                    </select>
                    <button
                            className={'border-2 opacity-80 rounded-lg bg-green-400 p-2 hover:bg-green-500 text-gray-900'}
                        >Send
                        </button>
                </div>
            </form>
            {error && <p className={'p-6 text-center text-3xl'}>{error}</p>}
            {/*{!pokemon.name && <img className={'w-1/3 object-contain mx-auto'} src='../../public/pokemonVopros.png'*/}
            {/*                       alt='Unknown Pokemon'/>}*/}
        </div>
    )
}

export default ChooseMe;