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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Progress,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaSearch, FaSortUp, FaSortDown, FaFilter, FaEllipsisV, FaFileExport, FaPlus, FaChartBar, FaWallet } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import { getAccountsbyClientID, getTransactionsByCompteId } from '../api/api';
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
          {isIncome ? 'Income' : 'Expense'}
        </Badge>
      </Td>
      <Td>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            size="sm"
          />
          <MenuList>
            <MenuItem>View Details</MenuItem>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
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

        const transactionsData = [];
        for (const account of accounts) {
          const accountTransactions = await getTransactionsByCompteId(account.id_account, token);
          transactionsData.push(...accountTransactions);
        }

        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching accounts or transactions:', error);
      } finally {
        setIsLoading(false);
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

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || (filterType === 'income' ? transaction.amount > 0 : transaction.amount < 0);
    
    let matchesTimeRange = true;
    const transactionDate = new Date(transaction.date);
    const now = new Date();
    
    switch (timeRange) {
      case 'week':
        matchesTimeRange = transactionDate >= new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        matchesTimeRange = transactionDate >= new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        matchesTimeRange = transactionDate >= new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        break;
    }

    return matchesSearch && matchesType && matchesTimeRange;
  });

  const incomeTotal = filteredTransactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expensesTotal = filteredTransactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const netIncome = incomeTotal - expensesTotal;

  const chartData = filteredTransactions
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((transaction) => ({
      date: new Date(transaction.date).toLocaleDateString(),
      amount: transaction.amount,
    }));

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
            <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">Transactions</Heading>
            <Text color="gray.600">Track and manage your financial activity</Text>
          </VStack>
          {/* <HStack spacing={4}>
            <Tooltip label="Export Transactions">
              <Button leftIcon={<FaFileExport />} variant="outline">Export</Button>
            </Tooltip>
            <Tooltip label="Add New Transaction">
              <Button leftIcon={<FaPlus />} colorScheme="purple">Add Transaction</Button>
            </Tooltip>
          </HStack> */}
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Stat bg="green.100" p={4} borderRadius="lg" shadow="sm">
            <StatLabel>Total Income</StatLabel>
            <StatNumber color="green.500">${incomeTotal.toFixed(2)}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>
          <Stat bg="red.100" p={4} borderRadius="lg" shadow="sm">
            <StatLabel>Total Expenses</StatLabel>
            <StatNumber color="red.500">${expensesTotal.toFixed(2)}</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat bg="purple.100" p={4} borderRadius="lg" shadow="sm">
            <StatLabel>Net Income</StatLabel>
            <StatNumber color="purple.500">${netIncome.toFixed(2)}</StatNumber>
            <StatHelpText>
              <StatArrow type={netIncome > 0 ? "increase" : "decrease"} />
              {Math.abs(((netIncome / incomeTotal) * 100).toFixed(2))}%
            </StatHelpText>
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
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
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
                <Th cursor="pointer" onClick={() => handleSort('description')}>
                  Transaction {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th cursor="pointer" onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th isNumeric cursor="pointer" onClick={() => handleSort('amount')}>
                  Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                </Th>
                <Th>Status</Th>
                <Th>Actions</Th>
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

