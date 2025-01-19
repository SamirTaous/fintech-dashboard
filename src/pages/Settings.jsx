import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  HStack,
  useToast,
  Grid,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { getClientById, updateClient } from '../api/api'; 

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [client, setClient] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchClientData = async () => {
      const token = localStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      const clientId = "00e7a090-f6de-4b8d-9214-293fac9047da";
      try {
        const clientData = await getClientById(clientId);
        setClient(clientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast({
          title: 'Error',
          description: 'There was an issue fetching your data.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchClientData();
  }, []);

  const handlePasswordChange = async () => {
    if (!newPassword) {
      toast({
        title: 'Error',
        description: 'Please enter a new password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const clientId = "00e7a090-f6de-4b8d-9214-293fac9047da";
  
    try {
      const updatedClient = {
        ...client, 
        password: newPassword, 
      };
  
      console.log(updatedClient);
      await updateClient(clientId, updatedClient); 
      toast({
        title: 'Password Updated',
        description: 'Your password has been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewPassword(''); // Clear password input
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: 'Error',
        description: 'There was an issue updating your password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const gradientText = useColorModeValue(
    'linear(to-r, purple.600, pink.600)',
    'linear(to-r, purple.400, pink.400)'
  );

  if (!client) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box bg="gray.50" minH="100vh" p={8}>
      <VStack spacing={8} align="stretch" maxW="1200px" mx="auto">
        <VStack align="start" spacing={1}>
          <Heading size="2xl" bgGradient={gradientText} bgClip="text">
            Settings
          </Heading>
          <Text color="gray.500" fontSize="lg">
            Manage your account settings and security preferences
          </Text>
        </VStack>

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
          {/* Profile Section */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          >
            <VStack align="stretch" spacing={6}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input value={client.firstName} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input value={client.lastName} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input value={client.telephoneNumber} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input value={new Date(client.dateOfBirthday).toLocaleDateString()} isReadOnly />
              </FormControl>
            </VStack>
          </Box>

          {/* Security Section */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            borderRadius="xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          >
            <VStack align="stretch" spacing={6}>
              <FormLabel>Change Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button colorScheme="purple" onClick={handlePasswordChange}>
                Update Password
              </Button>
            </VStack>
          </Box>
        </Grid>
      </VStack>
    </Box>
  );
};

export default Settings;
