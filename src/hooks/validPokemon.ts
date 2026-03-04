import {useParams} from "react-router";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {setPokemonName} from "../features/pokemon/pokemonSlice.ts";

export function useValidPokemon () {
    const {pokemonId = ''} = useParams();
    const dispatch = useAppDispatch();
    const {allPokemons} = useAppSelector(state => state.pokemon)

    useEffect(() => {
        dispatch(setPokemonName(pokemonId));
    }, [pokemonId, dispatch]);

    return {
        pokemonId,
        isValidPokemon: allPokemons.includes(pokemonId)
    }
}