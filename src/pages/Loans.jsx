import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {
  FaEllipsisV,
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaChartLine,
  FaInfoCircle,
} from 'react-icons/fa';

const LoanCard = ({ title, amount, rate, monthlyPayment }) => (
  <Box p={6} bg="white" borderRadius="xl" shadow="sm">
    <VStack align="stretch" spacing={4}>
      <HStack justify="space-between">
        <Text color="gray.500" fontSize="sm">{title}</Text>
        <FaFileInvoiceDollar size={20} color="var(--chakra-colors-purple-500)" />
      </HStack>
      <Stat>
        <StatNumber fontSize="2xl" color="gray.800">${amount.toLocaleString()}</StatNumber>
        <StatHelpText fontSize="sm" color="gray.500">
          {rate}% APR
        </StatHelpText>
      </Stat>
      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.600">Monthly Payment</Text>
        <Text fontSize="sm" fontWeight="bold" color="gray.800">
          ${monthlyPayment.toLocaleString()}
        </Text>
      </HStack>
    </VStack>
  </Box>
);

const LoanDetailsModal = ({ isOpen, onClose, loan }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Loan Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <VStack spacing={4} align="stretch">
          <Box p={4} bg="gray.50" borderRadius="md">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Stat>
                <StatLabel>Principal Amount</StatLabel>
                <StatNumber>${loan.amount.toLocaleString()}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Interest Rate</StatLabel>
                <StatNumber>{loan.rate}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Term Length</StatLabel>
                <StatNumber>{loan.term} months</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Monthly Payment</StatLabel>
                <StatNumber>${loan.monthlyPayment.toLocaleString()}</StatNumber>
              </Stat>
            </Grid>
          </Box>
          
          <Box>
            <Text fontWeight="medium" mb={2}>Payment Schedule</Text>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Principal</Th>
                  <Th>Interest</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loan.schedule.map((payment, idx) => (
                  <Tr key={idx}>
                    <Td>{payment.date}</Td>
                    <Td>${payment.principal}</Td>
                    <Td>${payment.interest}</Td>
                    <Td>${payment.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

function Loans() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const loans = [
    {
      type: 'Personal Loan',
      amount: 15000,
      remaining: 10000,
      rate: 8.5,
      nextPayment: '2024-04-01',
      term: 36,
      monthlyPayment: 450,
      status: 'active',
      schedule: [
        { date: '2024-04-01', principal: 380, interest: 70, total: 450 },
        { date: '2024-05-01', principal: 385, interest: 65, total: 450 },
        { date: '2024-06-01', principal: 390, interest: 60, total: 450 },
      ]
    },
    {
      type: 'Car Loan',
      amount: 25000,
      remaining: 18000,
      rate: 6.2,
      nextPayment: '2024-03-25',
      term: 60,
      monthlyPayment: 485,
      status: 'active',
      schedule: [
        { date: '2024-03-25', principal: 410, interest: 75, total: 485 },
        { date: '2024-04-25', principal: 415, interest: 70, total: 485 },
        { date: '2024-05-25', principal: 420, interest: 65, total: 485 },
      ]
    },
    {
      type: 'Home Loan',
      amount: 250000,
      remaining: 220000,
      rate: 4.5,
      nextPayment: '2024-04-05',
      term: 360,
      monthlyPayment: 1267,
      status: 'active',
      schedule: [
        { date: '2024-04-05', principal: 825, interest: 442, total: 1267 },
        { date: '2024-05-05', principal: 830, interest: 437, total: 1267 },
        { date: '2024-06-05', principal: 835, interest: 432, total: 1267 },
      ]
    }
  ];

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading size="lg">Loans</Heading>
            <Text color="gray.600">Manage your active loans and payments</Text>
          </VStack>
          <Button colorScheme="purple" leftIcon={<FaFileInvoiceDollar />}>
            Apply for Loan
          </Button>
        </Flex>

        {/* Loan Summary Cards */}
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {loans.map((loan) => (
            <LoanCard
              key={loan.type}
              title={loan.type}
              amount={loan.amount}
              rate={loan.rate}
              monthlyPayment={loan.monthlyPayment}
            />
          ))}
        </Grid>

        {/* Active Loans Table */}
        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden">
          <Table>
            <Thead bg="gray.50">
              <Tr>
                <Th>Loan Type</Th>
                <Th isNumeric>Amount</Th>
                <Th>Progress</Th>
                <Th isNumeric>Interest Rate</Th>
                <Th>Next Payment</Th>
                <Th>Status</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {loans.map((loan) => (
                <Tr key={loan.type}>
                  <Td fontWeight="medium">{loan.type}</Td>
                  <Td isNumeric>${loan.amount.toLocaleString()}</Td>
                  <Td>
                    <VStack align="stretch" spacing={1}>
                      <Progress
                        value={((loan.amount - loan.remaining) / loan.amount) * 100}
                        size="sm"
                        colorScheme="purple"
                        borderRadius="full"
                      />
                      <Text fontSize="xs" color="gray.500">
                        ${loan.remaining.toLocaleString()} remaining
                      </Text>
                    </VStack>
                  </Td>
                  <Td isNumeric>{loan.rate}%</Td>
                  <Td>
                    <HStack>
                      <FaCalendarAlt size={14} color="var(--chakra-colors-gray-400)" />
                      <Text>{new Date(loan.nextPayment).toLocaleDateString()}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Badge colorScheme="green" textTransform="capitalize">
                      {loan.status}
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
                        <MenuItem icon={<FaInfoCircle />} onClick={onOpen}>
                          View Details
                        </MenuItem>
                        <MenuItem icon={<FaFileInvoiceDollar />}>
                          Make Payment
                        </MenuItem>
                        <MenuItem icon={<FaChartLine />}>
                          View Statement
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <LoanDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        loan={loans[0]} // Pass the selected loan
      />
    </Box>
  );
}

export default Loans;
