import { PokemonClient } from "pokenode-ts";
import { prisma } from "../src/backend/utils/prisma";

const doBackFill = async () => {
    const pokeApi = new PokemonClient();

    const allPokemon = await pokeApi.listPokemons(0,493);

    console.log("pokemon?", allPokemon);

    const formattedPokemon = await allPokemon.results.map((p,index) => ({
        id: index + 1,
        name: (p as {name:string}).name,
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }))

    // drop existing data
    await prisma.pokemon.deleteMany();

    const creation = await prisma.pokemon.createMany({
        data: formattedPokemon
    })

    console.log("creation?", creation);
}

doBackFill();