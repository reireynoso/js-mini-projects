import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from '../utils/getRandomPokemon'
import { trpc } from '../utils/trpc';
import { useState } from 'react';

const buttonClasses = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"

const Home: NextPage = () => {

  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {id: first}]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {id: second}]);

  if(firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected:number) => {
    // todo: fire mutation to persist
    updateIds(getOptionsForVote())
  } 

  console.log(firstPokemon.data);
  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <div className='text-2xl text-center'>Which Pokemon is Rounder?</div>
      <div className='p-2'/>
      <div className='border rounded p-8 flex justify-between items-center max-w-2xl'>
        <div className='w-64 h-64 flex flex-col'>
          <img src={firstPokemon.data?.sprites.front_default} className='w-full'/>
          <div className='text-xl text-center capitalize mt-[-2rem]'>{firstPokemon.data?.name}</div>
          <button className={buttonClasses} onClick={() => voteForRoundest(first)}>Rounder</button>
        </div>
        <div className='p-8'>Vs</div>
        <div className='w-64 h-64 flex flex-col'>
          <img src={secondPokemon.data?.sprites.front_default} className='w-full'/>
          <div className='text-xl text-center capitalize mt-[-2rem]'>{secondPokemon.data?.name}</div>
          <button className={buttonClasses} onClick={() => voteForRoundest(second)}>Rounder</button>
        </div>
        <div className='p-2'/>
      </div>
    </div>
  ) 
}

export default Home
