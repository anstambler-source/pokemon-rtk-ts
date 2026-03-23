import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    error: null
}

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setError: (state, action) => {state.error = action.payload}
    }
})

export const {setError} = pokemonSlice.actions;
export default pokemonSlice.reducer;