import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
// --- CHANGE #1: Import the new dedicated function for fetching cards ---
import { fetchCardsByClientId } from '../api/api'; // We no longer need getAccountsbyClientID
import { CardComponent } from '../components/cards/CardComponent';

const MotionBox = motion(Box);

function Cards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // --- CHANGE #2: Renamed function for clarity ---
    const fetchCardData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken.user_id;

        // --- CHANGE #3: The Core Fix ---
        // We now call the dedicated endpoint for cards directly.
        // No more manual mapping from accounts!
        const fetchedCards = await fetchCardsByClientId(clientId, token);
        
        // The data is already in the correct card format, so we can set it directly.
        setCards(fetchedCards);

      } catch (error) {
        console.error('Error fetching card data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch card data. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [toast]);

  // --- No changes needed below this line, this logic is fine for a mock setup ---

  const toggleLock = async (id) => {
    // This is a front-end only simulation, which is fine for a portfolio project.
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating network delay

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isLocked: !card.isLocked } : card
        )
      );

      toast({
        title: 'Card Updated',
        description: `Card has been ${
          cards.find((c) => c.id === id)?.isLocked ? 'unlocked' : 'locked'
        }.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update card status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleFreeze = async (id) => {
    // This is a front-end only simulation
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, isFrozen: !card.isFrozen } : card
        )
      );

      toast({
        title: 'Card Updated',
        description: `Card has been ${
          cards.find((c) => c.id === id)?.isFrozen ? 'unfrozen' : 'frozen'
        }.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update card status. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">
                Your Cards
              </Heading>
              <Text color="gray.600">Manage and control your cards</Text>
            </VStack>
          </Flex>
        
          <Grid
            templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
            gap={8}
            alignItems="start"
            mt={4}
          >
            {cards.map((card) => (
              <CardComponent
                key={card.id}
                card={card}
                onLockToggle={() => toggleLock(card.id)}
                onFreezeToggle={() => toggleFreeze(card.id)}
              />
            ))}
          </Grid>
        </MotionBox>
      </VStack>
    </Box>
  );
}

export default Cards;