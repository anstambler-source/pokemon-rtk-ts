import {createApi, fetchBaseQuery, type FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {base_url} from "../../utils/constants.ts";
import type {
    allPokemonsInfo,
    evolutionsResponse,
    pokemonInfo,
    pokemonInfoResponse,
    speciesResponse
} from "../../utils/types";
import {transformerResponse} from "../../utils/transformerResponse.ts";

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: builder => ({
        getPokemonByName: builder.query<pokemonInfo, string>({
            query: (name) => `pokemon/${name}`,
            keepUnusedDataFor: 60 * 60 * 24,
            transformResponse: (data: pokemonInfoResponse) => (
                transformerResponse(data)
            )
        }),
        getAllPokemons: builder.query<string[], void>({
            query: () => 'pokemon?offset=0&limit=1350',
            transformResponse: (data: allPokemonsInfo)=> data.results.map(d => d.name)
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
        }),
        getImagesPokemonsEvolution: builder.query<pokemonInfo[], string[]>({
            async queryFn(names, _queryApi, _extraOptions, fetchWithBQ) {
                try {
                    const results = await Promise.all(names.map(name => fetchWithBQ(`pokemon/${name}`)))
                    const errors = results.find(r => r.error)
                    if (errors && errors.error) return {error: errors.error}
                    const data = results.map(r => transformerResponse(r.data as pokemonInfoResponse))
                    return {data: data as pokemonInfo[]}
                }catch (error){
                    return {error: error as FetchBaseQueryError}
                }
            }
        })
    })
})

export const {useGetPokemonByNameQuery, useLazyGetPokemonByNameQuery, useGetAllPokemonsQuery, useGetEvolutionPokemonQuery, useGetImagesPokemonsEvolutionQuery} = pokemonApi