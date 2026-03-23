import {useState} from "react";
import {
    useGetAllPokemonsQuery,
} from "../features/api/pokemonApi.ts";
import {bg_orange, pages} from "../utils/constants.ts";
import {useNavigate} from "react-router";


const ChooseMe = () => {
    const [pokemonName, setPokemonName] = useState<string>('')
    const normalizedPokemonName = pokemonName.trim().toLowerCase();
    const {data} = useGetAllPokemonsQuery();
    const navigate = useNavigate()

    function handleSend() {
        setPokemonName('')
        navigate(`${pages[0]}/${normalizedPokemonName}`)
    }

    return (
        <div className={'mx-10 opacity-90 font-medium'}>
            <button className={'bg-amber-600 p-1 rounded-md block mx-auto'} onClick={() => navigate('/')}>Home Page</button>
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
                    <label className={'text-black bg-purple-300 rounded-lg p-2'}>Choose a
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
                        <option></option>
                        {!!data && data.map((pokemon) =>
                            <option key={pokemon}>{pokemon.toUpperCase()}</option>
                        )}
                    </select>
                    <button
                            className={'border-2 rounded-lg bg-green-400 p-2 hover:bg-green-500 text-gray-900'}
                        >Send
                        </button>
                </div>
            </form>
        </div>
    )
}

export default ChooseMe;