import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'


//Layout component to achieve a similar layout throughout the application
const Layout = ({children}) => {
  return (
    <div>
       <Head>
            <title>Pokemon App</title>
            
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"/>
        </Head> 
      <Header />
      {children}
      <Footer/>
    </div>
  )
}

export default Layout
