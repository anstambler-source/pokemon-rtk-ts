import {createSlice} from "@reduxjs/toolkit";
import type {pokemonInfo} from "../../utils/types";

const initialState = {
    pokemonValue: {} as pokemonInfo,
    pokemonName: null,
    allPokemons: [] as string[],
    error: null,
    isEvolution: false,
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemon: (state, action) => {state.pokemonValue = action.payload},
        setError: (state, action) => {state.error = action.payload},
        setIsEvolution: (state, action) => {state.isEvolution = action.payload},
        setAllPokemons: (state, action) => {state.allPokemons = action.payload},
        setPokemonName: (state, action) => {state.pokemonName = action.payload}
    }
})

export const {setPokemon, setError, setIsEvolution, setAllPokemons, setPokemonName} = pokemonSlice.actions;
export default pokemonSlice.reducer;