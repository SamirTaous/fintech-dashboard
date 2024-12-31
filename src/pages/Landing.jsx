import React from 'react'
import '../landing.css'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import { Box } from '@chakra-ui/react'
import ServicesSection from '../components/landing/ServicesSection'

const Landing = () => {
  return (
    <Box bgColor='#9A83DB'>
        <Navbar/>
        <HeroSection/>
        <ServicesSection/>
    </Box>
  )
}

export default Landing