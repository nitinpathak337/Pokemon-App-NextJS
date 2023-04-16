import { ApolloClient, InMemoryCache } from '@apollo/client'

//setting apollo client  
const client = new ApolloClient({
  uri: 'https://graphql-pokemon2.vercel.app/.',
  cache: new InMemoryCache(),
})

export default client;