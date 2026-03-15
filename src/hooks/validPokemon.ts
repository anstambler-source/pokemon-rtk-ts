import {useParams} from "react-router";
import {useAppSelector} from "./hooks.ts";

export function useValidPokemon () {
    const {pokemonId = ''} = useParams();
    const {allPokemons} = useAppSelector(state => state.pokemon)

    return {
        pokemonId,
        isValidPokemon: allPokemons.includes(pokemonId)
    }
}