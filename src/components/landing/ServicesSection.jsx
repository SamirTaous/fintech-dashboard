import React from 'react';
import { Box, Flex, Text, Grid, VStack, Icon } from '@chakra-ui/react';
import { FaWallet, FaExchangeAlt, FaPiggyBank, FaMobileAlt } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, isHighlighted }) => (
  <Box
    bg={isHighlighted ? 'purple.600' : '#3B3B3B'}
    borderRadius="lg"
    p={6}
    color="white"
    maxWidth="620px"
  >
    <VStack textAlign="left" align="start" spacing={4}>
      {/* Title with Icon */}
      <Flex align="center">
        <Icon as={icon} boxSize={6} mr={4} />
        <Text fontSize="xl" fontFamily="Poppins" fontWeight="semibold">{title}</Text>
      </Flex>
      {/* Description */}
      <Text ml="38px" fontFamily="Poppins" fontWeight="medium" fontSize="sm" opacity={0.8}>{description}</Text>
    </VStack>
  </Box>
);

const ServicesSection = () => {
  return (
    <Box
      bgColor='#080808'
      minHeight="100vh"
      color="white"
      position="relative"
      py={20}
      px={0}
      mt='100px'
      pr="50px"
      pl="50px"
    >
      {/* Static Overlay */}
      <Box
        position="absolute"
        bottom="230px"
        right="542px"
        h="100%"
        w="100%"
        zIndex={0}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={12}
        pointerEvents="none"
      >
        <Text
          fontFamily="Poppins"
          fontSize="300px"
          fontWeight="bold"
          color="#6B5E90"
          opacity={0.5}
          lineHeight="1"
        >
          01
        </Text>
        <Text
          position="relative"
          bottom="120px"
          right="50px"
          fontSize="25px"
          fontFamily="Poppins"
          fontWeight="semibold"
          opacity={0.8}
          color="#6B5E90"
          mt={-12}
        >
          Services
        </Text>
      </Box>

      {/* Content */}
      <Flex
        direction="column"
        maxWidth="1200px"
        mx="10"
        position="relative"
        zIndex={1}
      >
        <Box textAlign='left' mb={16} mt="150px" lineHeight={1.2}>
          <Text fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="purple.300">
            Discover Our
          </Text>
          <Text fontSize="6xl" fontFamily="Poppins" fontWeight="semibold" color="white">
            Banking Solutions
          </Text>
        </Box>

        {/* Cards */}
        <Grid templateColumns="repeat(2, 1fr)" gap={8}>
          <ServiceCard
            icon={FaWallet}
            title="Everyday Banking"
            description="Convenient checking accounts for daily transactions, paired with secure online and mobile banking access."
            isHighlighted={true}
          />
          <ServiceCard
            icon={FaExchangeAlt}
            title="Bill Payments and Transfers"
            description="Easily pay bills, schedule recurring payments, and transfer money securely domestically and internationally."
            isHighlighted={false}
          />
          <ServiceCard
            icon={FaPiggyBank}
            title="Savings and Investments"
            description="Secure savings accounts to grow your funds with competitive interest rates and smart financial tools."
            isHighlighted={false}
          />
          <ServiceCard
            icon={FaMobileAlt}
            title="Financial Management Anywhere"
            description="Manage your accounts on the go with our secure and intuitive online banking platform."
            isHighlighted={false}
          />
        </Grid>
      </Flex>
    </Box>
  );
};

export default ServicesSection;
