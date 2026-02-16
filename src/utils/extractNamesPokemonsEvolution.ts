import type {evolutionChain, evolutionsResponse} from "./types";

export function extractNamesPokemonsEvolution (data: evolutionsResponse) {
    const names: string[] = []

    function extract (node: evolutionChain) {
        names.push(node.species.name)
        node.evolves_to?.forEach(extract)
    }

    extract(data.chain)
    return names
}