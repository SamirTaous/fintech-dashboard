import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Flex,
  useDisclosure,
  useToast,
  Container,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaFileInvoiceDollar, FaChartLine, FaHistory } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { createLoanApplication, fetchLoanApplications } from '../api/api';
import LoanApplicationModal from '../components/loans/LoanApplicationModal';
import LoanApplicationsTable from '../components/loans/LoanApplicationsTable';
import LoanStatistics from '../components/loans/LoanStatistics';
import LoanHistory from '../components/loans/LoanHistory';

function Loans() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanApplications, setLoanApplications] = useState([]);
  const [userId, setUserId] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
      } catch (error) {
        console.error('Error decoding token:', error);
        toast({
          title: 'Authentication Error',
          description: 'Please log in again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [toast]);

  useEffect(() => {
    const loadLoans = async () => {
      if (userId) {
        try {
          const loans = await fetchLoanApplications(userId);
          setLoanApplications(loans);
        } catch (error) {
          console.error('Error fetching loan applications:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch loan applications. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };
    loadLoans();
  }, [userId, toast]);

  const handleSubmit = async (formData) => {
    if (!userId) {
      toast({
        title: 'Error',
        description: 'User ID not available. Please log in again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      const newLoan = await createLoanApplication({
        ...formData,
        userId,
      });
      setLoanApplications([...loanApplications, newLoan]);
      onClose();
      toast({
        title: 'Loan Application Submitted',
        description: 'Your loan application has been successfully submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating loan application:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit loan application. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="2xl" color="purple.600">
                Loan Center
              </Heading>
              <Text color="gray.600">Manage your loans and applications</Text>
            </VStack>
            <Button
              colorScheme="purple"
              size="lg"
              onClick={onOpen}
              leftIcon={<FaFileInvoiceDollar />}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              transition="all 0.2s"
            >
              Apply for Loan
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <LoanStatistics loanApplications={loanApplications} />
            <LoanHistory loanApplications={loanApplications} />
          </SimpleGrid>

          <Box bg="white" borderRadius="xl" shadow="md" overflow="hidden">
            <LoanApplicationsTable loanApplications={loanApplications} />
          </Box>
        </VStack>
      </Container>

      <LoanApplicationModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </Box>
  );
}

export default Loans;

