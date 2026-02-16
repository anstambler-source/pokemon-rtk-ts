import {createSlice} from "@reduxjs/toolkit";
import type {pokemonInfo} from "../../utils/types";

const initialState = {
    pokemonValue: {} as pokemonInfo,
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
    }
})

export const {setPokemon, setError, setIsEvolution} = pokemonSlice.actions;
export default pokemonSlice.reducer;