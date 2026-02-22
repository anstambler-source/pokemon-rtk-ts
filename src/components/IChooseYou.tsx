import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import Evolution from "./Evolution.tsx";
import {setIsEvolution} from "../features/pokemon/pokemonSlice.ts";

function IChooseYou() {
    const pokemon = useAppSelector(state => state.pokemon.pokemonValue)
    const isEvolution = useAppSelector(state => state.pokemon.isEvolution)
    const dispatch = useAppDispatch()

    if(!isEvolution)
        return (
        <div className={'m-10 flex justify-center gap-20 items-center mt-20 font-serif text-lg'}>
            <div className={'flex flex-col space-y-3 bg-orange-100/50 p-6 rounded-xl shadow-md text-2xl'}>
                <p>Name: {pokemon.name}</p>
                <p>Type: {pokemon.type}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
            </div>
            <div className={'flex flex-col items-center'}>
                <img className={'w-full'} src={pokemon.imgLarge || pokemon.imgSmall} alt={pokemon.name}/>
                <button className={'mt-8 size-fit border-b-amber-800 rounded-xl bg-cyan-300 p-2 hover:bg-cyan-400 text-gray-900'} onClick={() => dispatch(setIsEvolution(true))}>Evolution</button>
            </div>
        </div>
    )
    return <Evolution />
}

export default IChooseYou;