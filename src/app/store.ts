import {configureStore} from "@reduxjs/toolkit";
import {pokemonApi} from "../features/api/pokemonApi.ts";
import pokemon from '../features/pokemon/pokemonSlice.ts'

export const store = configureStore({
    reducer: {
        pokemon,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch