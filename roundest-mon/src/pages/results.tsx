import { AsyncReturnType } from "@/utils/ts-bs";
import type { GetServerSideProps } from "next";
import { prisma } from "../backend/utils/prisma";
import Image from 'next/image';
type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
    const {VoteFor, VoteAgainst} = pokemon._count;
    if(VoteFor + VoteAgainst == 0){
        return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
}
const PokemonListing:React.FC<{pokemon: PokemonQueryResult[number]}> = ({pokemon}) => {
    return <div className="flex border-b p-2 items-center justify-between">
        <div className="flex">
            <Image
                src={pokemon.spriteUrl}
                width={32}
                height={32}
                layout="fixed"
            />
            <div className="capitalize">{pokemon.name}</div>
        </div>
        <div className="pr-4">{generateCountPercent(pokemon)} %</div>
    </div>
}
const ResultsPage:React.FC<{pokemon: PokemonQueryResult}> = (props) => {
    return <div className="flex flex-col items-center">
        <h2 className="text-2xl p-4">Results</h2>
        <div className="flex flex-col w-full max-w-2xl border">
            {
                props.pokemon?.map((currPokemon, index) => {
                    return <PokemonListing pokemon={currPokemon} key={index}/>
                })
            }
        </div>
    </div>
}

export default ResultsPage;

const getPokemonInOrder = async () => {
    return await prisma.pokemon.findMany({
        orderBy: {
            VoteFor: {
                _count: 'desc',
            }
        },
        select: {
            id: true,
            name: true,
            spriteUrl: true,
            _count: {
                select: {
                    VoteFor: true,
                    VoteAgainst: true
                }
            }
        }
    });
}

export const getStaticProps: GetServerSideProps = async () => {
    const pokemonOrdered = await getPokemonInOrder();
    console.log("pokemon search", pokemonOrdered);
    return {props: {pokemon: pokemonOrdered}, revalidate: 60 };
}