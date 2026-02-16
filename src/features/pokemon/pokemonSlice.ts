import {createSlice} from "@reduxjs/toolkit";
import type {pokemonInfo} from "../../utils/types";

const initialState = {
    pokemonValue: {} as pokemonInfo,
    error: null,
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemon: (state, action) => {state.pokemonValue = action.payload},
        setError: (state, action) => {state.error = action.payload},
    }
})

export const {setPokemon, setError} = pokemonSlice.actions;
export default pokemonSlice.reducer;