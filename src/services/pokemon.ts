import type { PokemonCard } from "@/types";

const grabSprite = (id: number) => `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`;
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export async function fetchCards(count: number): Promise<PokemonCard[]> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
    if (!response.ok) throw new Error("Failed to fetch Pokemon API");

    const data: { results: { name: string; url: string; }[] } = await response.json();
    const result: PokemonCard[] = data.results.map(item => {
        const parts = item.url.split("/").filter(Boolean);
        const id = Number(parts[parts.length - 1]);
        const imageUrl = grabSprite(id);

        return {
            id,
            name: capitalize(item.name),
            imageUrl,
            clicked: false,
        };
    });

    return result;
}