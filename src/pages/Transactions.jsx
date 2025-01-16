import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  HStack,
  VStack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { FaSearch, FaSortUp, FaSortDown } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode'; // Ensure the correct version is installed
import { getTransactionsByClientId } from '../api/api'; // Assuming API file is in the same directory

const TransactionRow = ({ transaction }) => {
  const isIncome = transaction.amount > 0;

  return (
    <Tr _hover={{ bg: 'gray.50' }} cursor="pointer">
      <Td>{transaction.description}</Td>
      <Td>{new Date(transaction.date).toLocaleDateString()}</Td>
      <Td isNumeric fontWeight="medium" color={isIncome ? 'green.500' : 'red.500'}>
        {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
      </Td>
      <Td>
        <Badge
          colorScheme={isIncome ? 'green' : 'red'}
          px={2}
          py={1}
          borderRadius="full"
          textTransform="capitalize"
        >
          {isIncome ? 'Income' : 'Expense'}
        </Badge>
      </Td>
    </Tr>
  );
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [clientId, setClientId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const extractedClientId = decodedToken.user_id; // Extract user_id from token
        setClientId(extractedClientId);
        console.log(extractedClientId);
        console.log(decodedToken);

        if (extractedClientId) {
          const fetchedTransactions = await getTransactionsByClientId(extractedClientId, token);
          setTransactions(fetchedTransactions);
        }
      } catch (error) {
        console.error('Error decoding token or fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prevState) => {
      if (prevState.key === key) {
        return {
          key,
          direction: prevState.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  // Sorting logic
  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const modifier = sortConfig.direction === 'asc' ? 1 : -1;

      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      return (aValue - bValue) * modifier;
    }
    return 0;
  });

  const filteredTransactions = sortedTransactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total income and expenses
  const incomeTotal = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Transactions</Heading>
            <Text color="gray.600">Track your financial activity</Text>
          </VStack>
          <HStack spacing={4}>
            <Button variant="outline">Export</Button>
            <Button colorScheme="purple">Add Transaction</Button>
          </HStack>
        </Flex>

        {/* Display Income and Expenses in Separate Boxes */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Box
            bg="green.100"
            p={6}
            borderRadius="lg"
            shadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack align="start">
              <Heading size="sm" color="green.500">
                Total Income
              </Heading>
              <Text color="green.700" fontSize="lg">
                ${incomeTotal.toFixed(2)}
              </Text>
            </VStack>
          </Box>
          <Box
            bg="red.100"
            p={6}
            borderRadius="lg"
            shadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack align="start">
              <Heading size="sm" color="red.500">
                Total Expenses
              </Heading>
              <Text color="red.700" fontSize="lg">
                ${expensesTotal.toFixed(2)}
              </Text>
            </VStack>
          </Box>
        </Grid>

        <Box bg="white" p={6} borderRadius="lg" shadow="sm">
          <InputGroup maxW="320px" mb={6}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Table variant="simple">
            <Thead>
              <Tr>
                <Th cursor="pointer" onClick={() => handleSort('description')}>
                  Transaction {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th isNumeric cursor="pointer" onClick={() => handleSort('amount')}>
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('type')}>
                  Status {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredTransactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
}

export default Transactions;
