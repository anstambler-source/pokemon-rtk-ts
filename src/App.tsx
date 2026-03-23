import './App.css'
import ChooseMe from "./components/ChooseMe.tsx";
import IChooseYou from "./components/IChooseYou.tsx";
import {Route, Routes, useLocation} from "react-router";
import AboutPokemons from "./components/AboutPokemons.tsx";
import {pages} from "./utils/constants.ts";
import Evolution from "./components/Evolution.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

function App() {
    const location = useLocation()

    return (
        <div
            className={`min-h-screen bg-fixed p-5 bg-cover ${['/', '/*'].includes(location.pathname) ? ' bg-[url(../public/ImagePokemonPokeballFon.png)]' : ' bg-[url(../public/ImagePokemonsFon.png)]'} bg-white/60 bg-blend-lighten`}>
            <ChooseMe/>
            <Routes>
                <Route path="/" element={<AboutPokemons/>} />
                <Route path={`${pages[0]}/:pokemonId?`} element={<IChooseYou/>}/>)
                <Route path={`${pages[1]}/:pokemonId?`} element={<Evolution/>}/>)
                <Route path='*' element={<ErrorPage/>}/>)
            </Routes>
        </div>
    )
}

export default App
