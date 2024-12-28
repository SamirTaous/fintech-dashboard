import { 
  Box, 
  VStack, 
  Text, 
  Heading, 
  HStack, 
  Icon, 
  Button 
} from '@chakra-ui/react';
import { FiArrowUpRight, FiArrowDownLeft } from '../icons';
import { Link } from 'react-router-dom';

const recentTransactions = [
  {
    id: 1,
    type: 'expense',
    description: 'Amazon Purchase',
    amount: -89.99,
    date: 'Today, 2:45 PM'
  },
  {
    id: 2,
    type: 'income',
    description: 'Salary Deposit',
    amount: 3500.00,
    date: 'Today, 9:00 AM'
  },
  {
    id: 3,
    type: 'expense',
    description: 'Netflix Subscription',
    amount: -15.99,
    date: 'Yesterday, 3:30 PM'
  },
  {
    id: 4,
    type: 'income',
    description: 'Freelance Payment',
    amount: 450.00,
    date: 'Yesterday, 10:30 AM'
},
{
    id: 5,
    type: 'expense',
    description: 'Groceries',
    amount: -120.50,
    date: 'Today, 5:15 PM'
},
{
    id: 6,
    type: 'income',
    description: 'Salary',
    amount: 3000.00,
    date: 'Last Friday, 8:00 AM'
}
];

function RecentTransactions() {
  return ( 
    <Box p={2} borderRadius="lg" >
      <VStack spacing={4} align="stretch">
        {recentTransactions.map(transaction => (
          <HStack 
            key={transaction.id} 
            justify="space-between"
            p={1}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            cursor="pointer"
          >
            <HStack spacing={3}>
              <Icon 
                as={transaction.type === 'income' ? FiArrowDownLeft : FiArrowUpRight}
                color={transaction.type === 'income' ? 'green.500' : 'red.500'}
                boxSize={5}
              />
              <Box textAlign="left">
                <Text fontWeight="medium">{transaction.description}</Text>
                <Text fontSize="sm" color="gray.500">{transaction.date}</Text>
              </Box>
            </HStack>
            <Text 
              fontWeight="medium"
              color={transaction.type === 'income' ? 'green.500' : 'red.500'}
            >
              {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export default RecentTransactions;