import type {pokemonInfo, pokemonInfoResponse} from "./types";

export function transformerResponse(data: pokemonInfoResponse): pokemonInfo {
    return {
        id: data.id,
        name: data.name,
        type: data.types[0].type.name,
        height: data.height,
        weight: data.weight,
        imgSmall: data.sprites.front_default,
        imgLarge: data.sprites.other.dream_world.front_default,
        speciesUrl: data.species.url
    }
}