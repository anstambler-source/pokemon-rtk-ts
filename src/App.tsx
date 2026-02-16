import './App.css'
import ChooseMe from "./components/ChooseMe.tsx";
import IChooseYou from "./components/IChooseYou.tsx";
import {useAppSelector} from "./hooks/hooks.ts";

function App() {
    const {name} = useAppSelector(state => state.pokemon.pokemonValue);

  return (
    <div className={`h-screen p-5 bg-cover ${!name ? ' bg-[url(../public/ImagePokemonPokeballFon.png)]' : ' bg-[url(../public/ImagePokemonsFon.png)]'} bg-white/60 bg-blend-lighten`}>
        <ChooseMe/>
        {name && <IChooseYou/>}
    </div>
      )
}

export default App
