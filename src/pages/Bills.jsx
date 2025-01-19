import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { getAllBillers, payFacture, getAccountsbyClientID } from '../api/api';
import { jwtDecode } from 'jwt-decode';

const MotionBox = motion(Box);

const BillerRow = ({ biller, onSelect }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Tr _hover={{ bg: bgColor }} cursor="pointer" onClick={() => onSelect(biller)}>
      <Td>{biller.biller_name}</Td>
      <Td>{biller.category}</Td>
      <Td>{biller.reference_type}</Td>
    </Tr>
  );
};

function Bills() {
  const [accounts, setAccounts] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [billers, setBillers] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    compteID: '',
  });

  useEffect(() => {
    const fetchAccounts = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error('No token found');
          return;
        }
  
        try {
          const decodedToken = jwtDecode(token);
          const extractedClientId = decodedToken.user_id;
          setClientId(extractedClientId);
  
          if (extractedClientId) {
            const fetchedAccounts = await getAccountsbyClientID(extractedClientId, token);
            setAccounts(fetchedAccounts);
          }
        } catch (error) {
          console.error('Error decoding token or fetching accounts:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAccounts();
    
    const fetchBillers = async () => {
      try {
        const billersData = await getAllBillers();
        console.log(billersData);
        setBillers(billersData);
      } catch (error) {
        console.error('Error fetching billers:', error);
        toast({
          title: 'Error fetching billers',
          description: 'Unable to load billers. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillers();
  }, [toast]);

  const handleBillerSelect = (biller) => {
    setSelectedBiller(biller);
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const billData = {
        ...formData,
        date: new Date().toISOString(),
        billerId: selectedBiller.biller_id,
        amount: parseFloat(formData.amount),
        compteID: formData.compteID,
        reference: selectedBiller.reference_type,
        description: selectedBiller.biller_name + ' Payment',
      };
      console.log(billData);
      await payFacture(billData);
      toast({
        title: 'Bill paid successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Error paying bill:', error);
      toast({
        title: 'Error paying bill',
        description: 'An error occurred while processing your payment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">Bills</Heading>
              <Text color="gray.600">Manage and pay your bills</Text>
            </VStack>
          </Flex>

          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <Heading size="md" mb={4}>Billers</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th>Reference</Th>
                </Tr>
              </Thead>
              <Tbody>
                {billers.map((biller) => (
                  <BillerRow key={biller.id} biller={biller} onSelect={handleBillerSelect} />
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </MotionBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Bill: {selectedBiller?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Select Account</FormLabel>
                  <Select name="compteID" value={formData.compteID} onChange={handleInputChange}>
                    <option value="">Select an Account</option>
                    {accounts.map((account) => (
                      <option key={account.id_account} value={account.id_account}>
                        {account.accountNumber} 
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Amount</FormLabel>
                  <Input name="amount" type="number" value={formData.amount} onChange={handleInputChange} />
                </FormControl>
              </VStack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Pay Bill
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Bills;

