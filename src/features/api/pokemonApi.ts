import {createApi, fetchBaseQuery, type FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {base_url} from "../../utils/constants.ts";
import type {
    allPokemonsInfo,
    evolutionsResponse,
    pokemonInfo,
    pokemonInfoResponse,
    speciesResponse
} from "../../utils/types";

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: builder => ({
        getPokemonByName: builder.query<pokemonInfo, string>({
            query: (name) => `pokemon/${name}`,
            keepUnusedDataFor: 60 * 60 * 24,
            transformResponse: (data: pokemonInfoResponse) => ({
                id: data.id,
                name: data.name,
                type: data.types[0].type.name,
                height: data.height,
                weight: data.weight,
                imgSmall: data.sprites.front_default,
                imgLarge: data.sprites.other.dream_world.front_default,
                speciesUrl: data.species.url
            })
        }),
        getAllPokemons: builder.query<allPokemonsInfo, void>({
            query: () => 'pokemon?offset=0&limit=1350'
        }),
        getEvolutionPokemon: builder.query<evolutionsResponse, string>({
            async queryFn (url: string, _queryApi, _extraOptions, fetchWithBQ) {
                try {
                    const speciesResult = await fetchWithBQ(url)
                    if (speciesResult.error) return {error: speciesResult.error}
                    const speciesData = speciesResult.data as speciesResponse
                    const evolutionUrl = speciesData.evolution_chain.url

                    const evolutionResult = await fetchWithBQ(evolutionUrl)
                    if (evolutionResult.error) return {error: evolutionResult.error}

                    return {data: evolutionResult.data as evolutionsResponse}
                } catch (error) {
                    return {error: error as FetchBaseQueryError}
                }
            }
        })
    })
})

export const {useGetPokemonByNameQuery, useLazyGetPokemonByNameQuery, useGetAllPokemonsQuery, useGetEvolutionPokemonQuery} = pokemonApi