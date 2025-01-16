import { Grid, GridItem, Flex, Image, Box, Button, Text, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaSignInAlt, FaRocket } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
const Navbar = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState('home');

  // Function to handle the click and set active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      alignItems="center"
      p={4}
      ml='50px'
      mr='50px'
      borderBottom="solid 1px"
      
    >
      {/* Brand Logo */}
      <GridItem colSpan={1}>
        <Box
          className="brand-logo"
          width="50px"
          height="50px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="brand-logo.png" />
        </Box>
      </GridItem>

      {/* Centered Navigation Links */}
      <GridItem colSpan={4}>
        <Flex justifyContent="center" alignItems="center" gap={12}>
          <Link
            href="#"
            onClick={() => handleLinkClick('home')}
            fontSize={25}
            fontFamily="Poppins"
            fontWeight="semibold"
            textDecoration={activeLink === 'home' ? 'underline' : 'none'}
            mr={3}
            ml={3}
            opacity={activeLink === 'home' ? 0.8 : 0.4}  
            _hover={{
              textDecoration: activeLink === 'home' ? 'underline' : 'none',
              color: 'inherit', 
              opacity: '0.8'
            }}
            textUnderlineOffset="12px"
          >
            Home
          </Link>
          <Link
            href="#"
            onClick={() => handleLinkClick('services')}
            fontSize={25}
            fontFamily="Poppins"
            fontWeight="semibold"
            textDecoration={activeLink === 'services' ? 'underline' : 'none'}
            mr={3}
            ml={3}
            opacity={activeLink === 'services' ? 0.8 : 0.4}  
            _hover={{
              textDecoration: activeLink === 'services' ? 'underline' : 'none',
              color: 'inherit', 
              opacity: '0.8'
            }}
            textUnderlineOffset="12px"
          >
            Services
          </Link>
          <Link
            href="#"
            onClick={() => handleLinkClick('cards')}
            fontSize={25}
            fontFamily="Poppins"
            fontWeight="semibold"
            textDecoration={activeLink === 'cards' ? 'underline' : 'none'}
            mr={3}
            ml={3}
            opacity={activeLink === 'cards' ? 0.8 : 0.4}  
            _hover={{
              textDecoration: activeLink === 'cards' ? 'underline' : 'none',
              color: 'inherit', 
              opacity: '0.8'
            }}
            textUnderlineOffset="12px"
          >
            Cards
          </Link>
          <Link
            href="#"
            onClick={() => handleLinkClick('about')}
            fontSize={25}
            fontFamily="Poppins"
            fontWeight="semibold"
            textDecoration={activeLink === 'about' ? 'underline' : 'none'}
            mr={3}
            ml={3}
            opacity={activeLink === 'about' ? 0.8 : 0.4}  
            _hover={{
              textDecoration: activeLink === 'about' ? 'underline' : 'none',
              color: 'inherit', 
              opacity: '0.8'
            }}
            textUnderlineOffset="12px"
          >
            About Us
          </Link>
        </Flex>
      </GridItem>

      {/* Buttons for Login and Get Started */}
      <GridItem colSpan={1}>
        <Flex justifyContent="flex-end" alignItems="center" gap={4}>
          <Button
            size="lg"
            variant="outline"
            border="1px solid black"
            borderRadius={10}
            borderStyle="solid" 
            _hover={{
              borderColor: "black",
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            }}
            _focus={{
              boxShadow: 'none', 
            }}
          >
            Get Started
          </Button>
          <Button
            as={RouterLink}
            to="/login"
            size="lg"
            variant="outline"
            borderColor="black"
            borderRadius={10}
            borderStyle="solid"
            _hover={{
              borderColor: "black",
              backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            }}
            _focus={{
              boxShadow: 'none', 
            }}
          >
            Login
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default Navbar;
