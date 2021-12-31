import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { inferQueryResponse } from './api/trpc/[trpc]';

const buttonClasses = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"

const Home: NextPage = () => {

  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {id: first}]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {id: second}]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected:number) => {
    // todo: fire mutation to persist
    if(selected === first){
      voteMutation.mutate({votedFor: first, votedAgainst: second});
    }else{
      voteMutation.mutate({votedFor: second, votedAgainst: first});
    }
    updateIds(getOptionsForVote())
  } 

  console.log(firstPokemon.data);
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <div className='text-2xl text-center'>Which Pokemon is Rounder?</div>
      <div className='p-2'/>
      <div className='border rounded p-8 flex justify-between items-center max-w-2xl'>
        {
          !firstPokemon.isLoading && !secondPokemon.isLoading && firstPokemon.data && secondPokemon.data && (
            <>
              <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)}/>
              <div className='p-8'>Vs</div>
              <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)}/>
            </>
          )
        }
        <div className='p-2'/>
      </div>
      <div className='absolute bottom-0 w-full text-xl text-center pb-2'>
        <a href='https://github.com/reireynoso/js-mini-projects/tree/main/roundest-mon'>Github</a>
        {" | "}
        <Link href={"/results"}>
          <a>Results</a>
        </Link>
      </div>
    </div>
  ) 
}

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing:React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {
  return (<div className='flex flex-col items-center'>
    <Image src={props.pokemon.spriteUrl || ""} 
      height={256} 
      width={256}
      className='w-64 h-64'
      layout='fixed'
      />
    <div className='text-xl text-center capitalize mt-[-2rem]'>{props.pokemon.name}</div>
    <button className={buttonClasses} onClick={() => props.vote()}>Rounder</button>
  </div>)
}

export default Home
