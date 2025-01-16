import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Badge,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { getAccountsbyClientID } from '../api/api'; // Assuming API file is in the same directory

const AccountCard = ({ account }) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      shadow="sm"
      borderLeftWidth={4}
      borderColor={account.status === 'ACTIVE' ? 'green.500' : 'red.500'}
    >
      <VStack align="start" spacing={2}>
        <Heading size="sm" color="gray.700">
          {account.accountType} Account
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Account Number: {account.accountNumber}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Balance: ${account.balance.toFixed(2)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Created On: {new Date(account.createdAt).toLocaleDateString()}
        </Text>
        <Badge colorScheme={account.status === 'ACTIVE' ? 'green' : 'red'}>
          {account.status}
        </Badge>
      </VStack>
    </Box>
  );
};

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const extractedClientId = decodedToken.user_id; // Extract user_id from token
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
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Accounts</Heading>
            <Text color="gray.600">Manage your accounts efficiently</Text>
          </VStack>
          <HStack spacing={4}>
            <Button variant="outline">Export</Button>
            <Button colorScheme="purple">Add Account</Button>
          </HStack>
        </Flex>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {accounts.map((account) => (
            <AccountCard key={account.id_account} account={account} />
          ))}
        </Grid>
      </VStack>
    </Box>
  );
}

export default Accounts;
