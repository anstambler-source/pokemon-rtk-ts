export interface pokemonInfoResponse {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: {
        front_default: string;
        other: {
            dream_world: {
                front_default: string;
            }
        }
    },
    types: [{
        type: {
            name: string;
        }
    }],
    species: {
        url: string
    },
}

export interface pokemonInfo {
    name: string;
    type: string;
    height: number;
    weight: number;
    imgSmall: string;
    imgLarge: string;
    speciesUrl: string;
}

export interface allPokemonsInfo {
    results:
        {
        name: string,
        url: string,
    }[]
}

export interface speciesResponse {
    evolution_chain: {
        url: string
    }
}

export interface evolutionChain {
    species: {
        name: string,
    },
    evolves_to?: evolutionChain[]
}

export interface evolutionsResponse {
    chain: evolutionChain
}

export interface evolutionsResponse2 {
    chain: {
        species: {
            name: string,
        },
        evolves_to: [
            {
                species?: {
                    name: string,
                },
                evolves_to?: [
                    {
                        species?: {
                            name: string,
                        }
                    }
                ]
            }
        ]
    }
}