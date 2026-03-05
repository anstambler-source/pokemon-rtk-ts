import './App.css'
import ChooseMe from "./components/ChooseMe.tsx";
import IChooseYou from "./components/IChooseYou.tsx";
import {useAppSelector} from "./hooks/hooks.ts";
import {Route, Routes} from "react-router";
import AboutPokemons from "./components/AboutPokemons.tsx";
import {pages} from "./utils/constants.ts";

function App() {
    const {name} = useAppSelector(state => state.pokemon.pokemonValue);

    return (
        <div
            className={`min-h-screen bg-fixed p-5 bg-cover ${!name ? ' bg-[url(../public/ImagePokemonPokeballFon.png)]' : ' bg-[url(../public/ImagePokemonsFon.png)]'} bg-white/60 bg-blend-lighten`}>
            <ChooseMe/>
            <Routes>
                <Route path="/" element={<AboutPokemons/>} />
                <Route path={`${pages[1]}/:pokemonId?`} element={<IChooseYou/>}/>)
            </Routes>
        </div>
    )
}

export default App
