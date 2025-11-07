import React from 'react'
import Abouthero from './components/Abouthero'
import Intro from './components/Intro'
import Team from './components/Team'
import Testimonial from './components/Testimonial'
import Section from './components/Section'

const About = () => {
  return (
    <div>
        <Abouthero />
        <Intro />
        <Team />
        <Testimonial />
        <Section />
    </div>
  )
}

export default About