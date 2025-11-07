import React from 'react'
import Hero from './components/Hero'
import Offer from './components/Offer'
import Products from './components/Products'
import Segment from './components/Segment'
import Section1 from './components/Section1'

const Home = () => {
  return (
    <div>
        <Hero />
        <Segment />
        <Products />
        <Offer />
        <Section1 />
    </div>
  )
}

export default Home