import { Flex, Box, Heading, Button, Image, Text, ButtonGroup } from '@chakra-ui/react';
import React from 'react';

const HeroSection = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      mt={10}
      flexWrap="wrap"
      position="relative"
    >
      {/* Left Content */}
      <Box margin="0 40px" maxW="1000px" textAlign="left" zIndex={2}>
        <Text
          as="h1"
          fontFamily="Poppins"
          fontWeight="semibold"
          fontSize="8rem"
          color="black"
          opacity='80%'
          lineHeight="1"
        >
          Innovate <br/>
          your <Text as="span" fontWeight="extrabold" opacity="100" bgGradient="linear(to-r, black, #BF8AFF)" bgClip="text"> banking </Text> experience
        </Text> 
        <Flex mt={12} gap={8}>
            <Button
                size="lg"
                h="70px"
                w="200px"
                variant="outline"
                fontSize="25px"
                border="1px solid black"
                borderRadius={10}
                borderStyle="solid" // Explicitly set border style
                _hover={{
                borderColor: "black",
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darken background
                }}
                _focus={{
                boxShadow: 'none', // Remove focus ring
                }}
            > 
                Get Started
            </Button>
            <Button
                size="lg"
                h="70px"
                w="200px"
                variant="outline"
                fontSize="25px"
                border="1px solid black"
                borderRadius={10}
                borderStyle="solid" // Explicitly set border style
                _hover={{
                borderColor: "black",
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly darken background
                }}
                _focus={{
                boxShadow: 'none', // Remove focus ring
                }}
            >
                Learn more
          </Button>
        </Flex>
      </Box>

      {/* Right Image */}
      <Box 
        position="absolute" 
        top={-5} 
        right={10} 
        maxW="700px" 
        mt={0} 
        zIndex={1}
      >
        <Image
          src="/credit-cards.png"
          alt="Cards"
          w="600px"
        />
      </Box>
    </Flex>
  );
};

export default HeroSection;
