import './App.css'
import ChooseMe from "./components/ChooseMe.tsx";
import IChooseYou from "./components/IChooseYou.tsx";
import {useAppSelector} from "./hooks/hooks.ts";
import {Routes} from "react-router";
import {pages} from "./utils/constants.ts";

function App() {
    const {name} = useAppSelector(state => state.pokemon.pokemonValue);

    return (
        <div
            className={`min-h-screen bg-fixed p-5 bg-cover ${!name ? ' bg-[url(../public/ImagePokemonPokeballFon.png)]' : ' bg-[url(../public/ImagePokemonsFon.png)]'} bg-white/60 bg-blend-lighten`}>
            <ChooseMe/>
            <Routes>
                {name && <IChooseYou/>}
            </Routes>
        </div>
    )
}

export default App
