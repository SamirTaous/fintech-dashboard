import React from 'react'
import '../landing.css'
import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import { Box } from '@chakra-ui/react'

const Landing = () => {
  return (
    <Box h='100vh' bgColor='#9A83DB' padding="0 50px">
        <Navbar/>
        <HeroSection/>
    </Box>
  )
}

export default Landing