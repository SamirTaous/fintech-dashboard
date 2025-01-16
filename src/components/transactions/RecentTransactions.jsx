import { useEffect, useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  HStack, 
  Icon, 
  Button 
} from '@chakra-ui/react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { getTransactionsByClientId } from '../../api/api'; // Assuming API file is in the same directory

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [clientId, setClientId] = useState(2); // Example client ID, replace with dynamic logic

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await getTransactionsByClientId(clientId);
        // Sort transactions by date in descending order
        const sortedTransactions = fetchedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Limit to the first 6 transactions
        setTransactions(sortedTransactions.slice(0, 6));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [clientId]);

  return ( 
    <Box p={2} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        {transactions.map(transaction => (
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
                as={transaction.amount > 0 ? FiArrowDownLeft : FiArrowUpRight}
                color={transaction.amount > 0 ? 'green.500' : 'red.500'}
                boxSize={5}
              />
              <Box textAlign="left">
                <Text fontWeight="medium">{transaction.description}</Text>
                <Text fontSize="sm" color="gray.500">{new Date(transaction.date).toLocaleString()}</Text>
              </Box>
            </HStack>
            <Text 
              fontWeight="medium"
              color={transaction.amount > 0 ? 'green.500' : 'red.500'}
            >
              {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export default RecentTransactions;
