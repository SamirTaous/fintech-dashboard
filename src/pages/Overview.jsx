import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Flex,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaChevronDown,
  FaPaperPlane,
  FaDownload,
  FaCreditCard,
  FaPlus,
} from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsCashStack } from 'react-icons/bs';
import StatCard from '../components/stats/StatCard';
import OverviewChart from '../components/charts/OverviewChart';
import QuickActions from '../components/quick-actions/QuickActions';
import RecentTransactions from '../components/transactions/RecentTransactions';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAccountsbyClientID } from '../api/api';

const chartData = [
  { name: 'Jan', amount: 2300, expenses: 1800 },
  { name: 'Feb', amount: 3000, expenses: 2200 },
  { name: 'Mar', amount: 5000, expenses: 3100 },
  { name: 'Apr', amount: 4500, expenses: 2800 },
  { name: 'May', amount: 6000, expenses: 3500 },
  { name: 'Jun', amount: 5500, expenses: 3200 },
];

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <Button
    variant="ghost"
    p={6}
    w="full"
    h="auto"
    display="flex"
    flexDirection="column"
    gap={2}
    bg="white"
    _hover={{ bg: 'purple.50' }}
    onClick={onClick}
  >
    <Box p={3} borderRadius="xl" bg="purple.100" color="purple.600">
      <Icon size={20} />
    </Box>
    <Text fontSize="sm" color="gray.600">
      {label}
    </Text>
  </Button>
);

function Overview() {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.600, purple.700)',
    'linear(to-r, purple.700, purple.800)'
  );

  const [totalBalance, setTotalBalance] = useState(null);
  const [accountCount, setAccountCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const clientId = decodedToken?.user_id;
        if (!clientId) {
          throw new Error('Invalid token: clientId not found');
        }

        const response = await getAccountsbyClientID(clientId, token);
        console.log(response);
        console.log(response.data);
        const accounts = response;
        const balance = accounts.reduce((sum, account) => sum + account.balance, 0);

        setTotalBalance(balance);
        setAccountCount(accounts.length);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <Box p={8} bg="gray.50" minHeight="100vh">
      {/* Header Section */}
      <Flex direction="row" justify="space-between" align="center" mb={8}>
        <VStack align="start" spacing={1}>
          <Heading size="lg" color="gray.800">
            Overview
          </Heading>
          <Text color="gray.600">Welcome back, John Doe</Text>
        </VStack>
        <HStack spacing={4}>
          <Button leftIcon={<FaPlus />} variant="outline" colorScheme="purple">
            Add Money
          </Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />} colorScheme="purple">
              Quick Actions
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaPaperPlane />}>Send Money</MenuItem>
              <MenuItem icon={<FaDownload />}>Request Payment</MenuItem>
              <MenuItem icon={<FaCreditCard />}>Link New Card</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Main Grid Section */}
      <Grid templateColumns="repeat(6, 1fr)" templateRows="repeat(4, auto)" gap={6}>
        {/* Balance Card */}
        <GridItem colSpan={3} rowSpan={2}>
          <Box
            bgGradient={bgGradient}
            color="white"
            p={6}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            h="full"
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
            <VStack align="stretch" spacing={4}>
              {isLoading ? (
                <Spinner size="lg" color="white" alignSelf="center" />
              ) : (
                <>
                  <HStack justify="space-between">
                    <Text fontSize="sm" opacity={0.8}>
                      Total Balance
                    </Text>
                    <AiFillDollarCircle size={24} />
                  </HStack>
                  <Heading className="balance-heading">${totalBalance.toFixed(2)}</Heading>
                  <Text fontSize="sm" opacity={0.8}>
                    Available in {accountCount} account{accountCount !== 1 ? 's' : ''}
                  </Text>
                </>
              )}
            </VStack>
          </Box>
        </GridItem>

        {/* Stat Cards */}
        <GridItem colSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="green.500">
                <FaArrowAltCircleUp />
                <Text fontSize="sm">Income</Text>
              </HStack>
              <Heading size="lg">$940</Heading>
              <Text fontSize="xs" color="gray.500">
                +12% from last month
              </Text>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="red.500">
                <FaArrowAltCircleDown />
                <Text fontSize="sm">Expenses</Text>
              </HStack>
              <Heading size="lg">$890</Heading>
              <Text fontSize="xs" color="gray.500">
                -3% from last month
              </Text>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="purple.500">
                <FaSackDollar />
                <Text fontSize="sm">Savings</Text>
              </HStack>
              <Heading size="lg">$240</Heading>
              <Text fontSize="xs" color="gray.500">
                Goal: $1,000
              </Text>
            </VStack>
          </Box>
        </GridItem>

        {/* Quick Actions */}
        <GridItem colSpan={3}>
          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
            <QuickAction icon={FaPaperPlane} label="Send" />
            <QuickAction icon={FaDownload} label="Request" />
            <QuickAction icon={BsCashStack} label="Top Up" />
          </Grid>
        </GridItem>

        {/* Chart Section */}
        <GridItem colSpan={4} rowSpan={2}>
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="md">Monthly Overview</Heading>
                <Text fontSize="sm" color="gray.500">
                  Income vs Expenses
                </Text>
              </VStack>
              <Select size="sm" w="auto" defaultValue="6months">
                <option value="6months">Last 6 months</option>
                <option value="3months">Last 3 months</option>
                <option value="1year">Last year</option>
              </Select>
            </Flex>
            <Box h="300px">
              <OverviewChart data={chartData} />
            </Box>
          </Box>
        </GridItem>

        {/* Recent Transactions */}
        <GridItem colSpan={2} rowSpan={2}>
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" h="full">
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="md">Recent Transactions</Heading>
                <Text fontSize="sm" color="gray.500">
                  Last 6 transactions
                </Text>
              </VStack>
              <Button as={Link} to="/transactions" variant="ghost" size="sm" colorScheme="purple">
                View All
              </Button>
            </Flex>
            <RecentTransactions />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Overview;
