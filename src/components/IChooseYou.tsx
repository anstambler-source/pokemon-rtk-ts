import {useAppSelector} from "../hooks/hooks.ts";
import {useState} from "react";
import Evolution from "./Evolution.tsx";

function IChooseYou() {
    const pokemon = useAppSelector(state => state.pokemon.pokemonValue)
    const [isEvolution, setIsEvolution] = useState(false);
    const handleEvolution = () => {
        setIsEvolution(prevState => !prevState);
    }

    if(!isEvolution)
        return (
        <div className={'m-10 flex justify-center gap-20 items-center mt-20 font-serif text-lg'}>
            <div className={'flex flex-col space-y-3 bg-orange-100/50 p-6 rounded-xl shadow-md text-2xl'}>
                <p>Name: {pokemon.name}</p>
                <p>Type: {pokemon.type}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
            </div>
            <div>
                <img className={'w-full'} src={pokemon.imgLarge || pokemon.imgSmall} alt={pokemon.name}/>
                <button onClick={handleEvolution}>Evolution</button>
            </div>
        </div>
    )
    return <Evolution handleEvolution={handleEvolution} />
}

export default IChooseYou;