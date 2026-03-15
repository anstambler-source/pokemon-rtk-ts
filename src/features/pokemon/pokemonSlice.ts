import {createSlice} from "@reduxjs/toolkit";
import type {pokemonInfo} from "../../utils/types";

const initialState = {
    pokemonValue: {} as pokemonInfo,
    allPokemons: [] as string[],
    error: null,
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemon: (state, action) => {state.pokemonValue = action.payload},
        setError: (state, action) => {state.error = action.payload},
        setAllPokemons: (state, action) => {state.allPokemons = action.payload},
    }
})

export const {setPokemon, setError, setAllPokemons} = pokemonSlice.actions;
export default pokemonSlice.reducer;