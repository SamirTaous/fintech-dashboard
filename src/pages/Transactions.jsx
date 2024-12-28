import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  VStack,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import {
  FaShoppingCart,
  FaUtensils,
  FaBriefcase,
  FaMoneyBillWave,
  FaShoppingBag,
  FaChartLine,
  FaEllipsisV,
  FaSearch,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';
import { useState } from 'react';

const categoryIcons = {
  Grocery: FaShoppingCart,
  Restaurant: FaUtensils,
  Salary: FaBriefcase,
  Freelance: FaMoneyBillWave,
  Shopping: FaShoppingBag,
  Investment: FaChartLine,
};

const TransactionRow = ({ transaction }) => {
  const IconComponent = categoryIcons[transaction.category] || FaMoneyBillWave;

  return (
    <Tr _hover={{ bg: 'gray.50' }} cursor="pointer">
      <Td>
        <HStack spacing={3}>
          <Box
            p={2}
            borderRadius="lg"
            bg={transaction.type === 'income' ? 'green.100' : 'red.100'}
            color={transaction.type === 'income' ? 'green.500' : 'red.500'}
          >
            <IconComponent />
          </Box>
          <VStack align="start" spacing={0}>
            <Text fontWeight="medium">{transaction.description}</Text>
            <Text fontSize="sm" color="gray.500">{transaction.category}</Text>
          </VStack>
        </HStack>
      </Td>
      <Td>{new Date(transaction.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}</Td>
      <Td isNumeric fontWeight="medium" color={transaction.type === 'income' ? 'green.500' : 'red.500'}>
        {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
      </Td>
      <Td>
        <Badge
          colorScheme={transaction.type === 'income' ? 'green' : 'red'}
          px={2}
          py={1}
          borderRadius="full"
          textTransform="capitalize"
        >
          {transaction.type}
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
            <MenuItem>Download Receipt</MenuItem>
            <MenuItem>Report Issue</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};

function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const transactions = [
    { id: 1, date: '2024-03-10', description: 'Grocery Store', amount: 120.50, type: 'expense', category: 'Grocery' },
    { id: 2, date: '2024-03-09', description: 'Monthly Salary', amount: 3000.00, type: 'income', category: 'Salary' },
    { id: 3, date: '2024-03-08', description: 'Restaurant Dinner', amount: 45.80, type: 'expense', category: 'Restaurant' },
    { id: 4, date: '2024-03-07', description: 'Freelance Project', amount: 850.00, type: 'income', category: 'Freelance' },
    { id: 5, date: '2024-03-06', description: 'Online Shopping', amount: 89.99, type: 'expense', category: 'Shopping' },
    { id: 6, date: '2024-03-05', description: 'Stock Dividends', amount: 420.00, type: 'income', category: 'Investment' },
  ];

  const netIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netBalance = netIncome - netExpenses;

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
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Stats Cards */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Stat>
              <StatLabel color="gray.500">Net Balance</StatLabel>
              <StatNumber fontSize="2xl" color={netBalance >= 0 ? "green.500" : "red.500"}>
                ${netBalance.toFixed(2)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={netBalance >= 0 ? "increase" : "decrease"} />
                {((netBalance / netIncome) * 100).toFixed(1)}% of income
              </StatHelpText>
            </Stat>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Stat>
              <StatLabel color="gray.500">Total Income</StatLabel>
              <StatNumber fontSize="2xl" color="green.500">${netIncome.toFixed(2)}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36% from last month
              </StatHelpText>
            </Stat>
          </Box>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm">
            <Stat>
              <StatLabel color="gray.500">Total Expenses</StatLabel>
              <StatNumber fontSize="2xl" color="red.500">${netExpenses.toFixed(2)}</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                12.45% from last month
              </StatHelpText>
            </Stat>
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
                <Th></Th>
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
