import React, { useEffect, useState } from 'react';
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
  Select,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Spinner, // Added Spinner for loading state
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
// --- FIX #1: Make sure we import the CORRECT renamed function ---
import { getAccountsbyClientID, getTransactionsByAccountId } from '../api/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const MotionBox = motion(Box);

const TransactionRow = ({ transaction }) => {
  const isIncome = transaction.amount > 0;
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Tr _hover={{ bg: bgColor }} cursor="pointer">
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
          {transaction.type} {/* Displaying the actual type from data */}
        </Badge>
      </Td>
    </Tr>
  );
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        setIsLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const clientId = decodedToken.user_id;

        const accounts = await getAccountsbyClientID(clientId, token);
        if (!accounts || accounts.length === 0) {
          console.warn('No accounts found for the client');
          setIsLoading(false);
          return;
        }

        const transactionsPromises = accounts.map(account => 
            // --- FIX #2: Use the correct function name: getTransactionsByAccountId ---
            // --- FIX #3: Use the correct property: account.id instead of account.id_account ---
            getTransactionsByAccountId(account.id, token)
        );
        
        const transactionsForAllAccounts = await Promise.all(transactionsPromises);
        const flattenedTransactions = transactionsForAllAccounts.flat(); // .flat() combines the arrays of transactions into one

        setTransactions(flattenedTransactions);
      } catch (error) {
        console.error('Error fetching accounts or transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  
  // The rest of your component logic remains the same, it will now work because 'transactions' will have data.

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || (filterType === 'income' ? transaction.amount > 0 : transaction.amount < 0);
    
    let matchesTimeRange = true;
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        matchesTimeRange = transactionDate >= lastWeek;
        break;
      case 'month':
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        matchesTimeRange = transactionDate >= lastMonth;
        break;
      case 'year':
        const lastYear = new Date();
        lastYear.setFullYear(now.getFullYear() - 1);
        matchesTimeRange = transactionDate >= lastYear;
        break;
      default:
        break;
    }

    return matchesSearch && matchesType && matchesTimeRange;
  });

  const incomeTotal = filteredTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = Math.abs(filteredTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0));

  const netIncome = incomeTotal - expensesTotal;

  const chartData = filteredTransactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((transaction) => ({
      date: new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: transaction.amount,
    }));

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
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
              <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">Transactions</Heading>
              <Text color="gray.600">Track and manage your financial activity</Text>
            </VStack>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Stat bg="green.100" p={4} borderRadius="lg" shadow="sm">
              <StatLabel>Total Income</StatLabel>
              <StatNumber color="green.500">${incomeTotal.toFixed(2)}</StatNumber>
            </Stat>
            <Stat bg="red.100" p={4} borderRadius="lg" shadow="sm">
              <StatLabel>Total Expenses</StatLabel>
              <StatNumber color="red.500">${expensesTotal.toFixed(2)}</StatNumber>
            </Stat>
            <Stat bg="purple.100" p={4} borderRadius="lg" shadow="sm">
              <StatLabel>Net Income</StatLabel>
              <StatNumber color="purple.500">${netIncome.toFixed(2)}</StatNumber>
            </Stat>
          </SimpleGrid>

          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <Heading size="md" mb={4}>Transaction Overview</Heading>
            <Box height="300px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box bg="white" p={6} borderRadius="lg" shadow="md">
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Transaction List</Heading>
              <HStack spacing={4}>
                <InputGroup maxW="320px">
                  <InputLeftElement pointerEvents="none">
                    <FaSearch color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  maxW="150px"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </Select>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  maxW="150px"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </Select>
              </HStack>
            </Flex>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Transaction</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Status</Th>
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
      </MotionBox>
    </Box>
  );
}

export default Transactions;