import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Button,
  Icon,
  HStack,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { 
  FaCreditCard, 
  FaWifi, 
  FaLock, 
  FaEllipsisH,
  FaPause,
} from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';

const CardComponent = ({ 
  cardNumber, 
  expiryDate, 
  balance, 
  cardType, 
  holderName, 
  isLocked, 
  color 
}) => {
  return (
    <Box
      bg={`linear-gradient(135deg, ${color[0]}, ${color[1]})`}
      borderRadius="2xl"
      p={6}
      position="relative"
      overflow="hidden"
      boxShadow="xl"
      w="full"
      h="220px"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 
          'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)',
      }}
    >
      <Flex direction="column" h="full" justify="space-between">
        <Flex justify="space-between" align="center">
          <Icon as={FaCreditCard} w={8} h={8} color="white" />
          <HStack spacing={2}>
            <Icon as={FaWifi} transform="rotate(90deg)" color="white" />
            {cardType === 'visa' ? (
              <Icon as={SiVisa} w={12} h={12} color="white" />
            ) : (
              <Icon as={SiMastercard} w={12} h={12} color="white" />
            )}
          </HStack>
        </Flex>

        <Text color="white" fontSize="xl" letterSpacing={8} mt={4}>
          **** **** **** {cardNumber}
        </Text>

        <Flex justify="space-between" align="flex-end">
          <Box>
            <Text color="whiteAlpha.700" fontSize="xs" mb={1}>
              Card Holder
            </Text>
            <Text color="white" fontSize="sm">
              {holderName}
            </Text>
            <Text color="whiteAlpha.700" fontSize="xs" mt={2}>
              Expires
            </Text>
            <Text color="white" fontSize="sm">
              {expiryDate}
            </Text>
          </Box>
          <Box textAlign="right">
            <Text color="whiteAlpha.700" fontSize="xs" mb={1}>
              Balance
            </Text>
            <Text color="white" fontSize="xl" fontWeight="bold">
              ${balance}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

function Cards() {
  const cards = [
    {
      cardNumber: '4589',
      expiryDate: '12/25',
      balance: '4,850.75',
      cardType: 'visa',
      holderName: 'JOHN DOE',
      isLocked: false,
      color: ['#0ea5e9', '#2563eb']
    },
    {
      cardNumber: '1234',
      expiryDate: '09/26',
      balance: '2,340.50',
      cardType: 'mastercard',
      holderName: 'JOHN DOE',
      isLocked: true,
      color: ['#a855f7', '#6366f1']
    }
  ];

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="gray.800">Your Cards</Heading>
          <Button colorScheme="purple" size="sm">Add New Card</Button>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          {cards.map((card, index) => (
            <Box key={index}>
              <CardComponent {...card} />
              <Flex mt={4} justify="space-between" align="center">
                <HStack spacing={4}>
                  <Button
                    size="sm"
                    leftIcon={<FaLock />}
                    variant="ghost"
                    colorScheme={card.isLocked ? "red" : "gray"}
                  >
                    {card.isLocked ? "Unlock" : "Lock"}
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FaPause />}
                    variant="ghost"
                  >
                    Freeze
                  </Button>
                </HStack>
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="gray"
                  rightIcon={<FaEllipsisH />}
                >
                  Details
                </Button>
              </Flex>
              <Flex mt={4} justify="space-between" align="center">
                <Badge colorScheme={card.isLocked ? "red" : "green"}>
                  {card.isLocked ? "Locked" : "Active"}
                </Badge>
                <Text fontSize="sm" color="gray.600">
                  Daily Limit: $10,000
                </Text>
              </Flex>
            </Box>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}

export default Cards;

