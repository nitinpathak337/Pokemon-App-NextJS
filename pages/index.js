import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useQuery, gql } from '@apollo/client'
import Link from 'next/link';
import client from '../client';

import styles from '../styles/home.module.css'


//graphQl query to get list of pokemons
const MY_QUERY = gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    weight{
      minimum
      maximum
    }
    height{
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
`
var first=200;


//Home component to display all the pokemon cards 
const Home = ({data}) => {
  
  
  //setting 20 pokemons limit per page
  const [limit,setLimit]=useState(20);
  
  
   
  const displayedData=data.pokemons.slice(0,limit);
  

  
  return (
    <div >
      <Layout> 
      <div className='min-vh-100 text-center p-5'>
        
        <ul className='d-flex flex-row align-items-center flex-wrap justify-content-center w-100 pl-0'>
      {displayedData.map((item) => (
        <Link key={item.id} className={styles.card} href={`./pokemon/${item.id}`}>
          
          <img src={`${item.image}`} alt={`${item.number}`} className={`h-50 w-50 bg-primary `}/> 
          <p className='text-secondary'>{`#${item.number}`}</p>
          <h4 className='text-info'>{item.name}</h4>
          
          <ul className={styles.typesList}>
            {item.types.map((each)=><li key={each} className={styles.typeItem}>{each}</li>)}
          </ul>
        </Link>
      ))}
    </ul>
        <button type="button" onClick={()=>setLimit((prevLimit)=>prevLimit+20) } className="btn btn-warning text-white">Load More</button>
      </div>
      </Layout> 
    </div>
  )
}

export default Home;


//getting all the pokemons data statically at the build time
export async function getStaticProps(context) {
  const { data } = await client.query({
    query: MY_QUERY,
    variables:{first}
  })


return {
  props: { data }
};
}




