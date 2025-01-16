import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  FormHelperText,
} from '@chakra-ui/react';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { createLoanApplication, fetchLoanApplications } from '../api/api'; // Adjust the path as needed

function Loans() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loanApplications, setLoanApplications] = useState([]);
  const [formData, setFormData] = useState({
    personAge: '',
    personGender: '',
    personEducation: '',
    personIncome: '',
    personEmpExp: '',
    personHomeOwnership: '',
    loanAmount: '',
    loanIntent: '',
    previousLoanDefaultsOnFile: '',
  
    // Default values
    loanIntRate: 8.5,
    loanPercentIncome: 15.5,
    cbPersonCredHistLength: 10,
    creditScore: 720,
    status: 'PENDING',
    predictionResult: '',
    applicationDate: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
  });
  

  // Fetch loan applications when the page loads
  useEffect(() => {
    const loadLoans = async () => {
      const userId = 1; // Replace with actual user ID
      try {
        const loans = await fetchLoanApplications(userId);
        setLoanApplications(loans);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };
    loadLoans();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 1; // Replace with actual user ID
      const newLoan = await createLoanApplication({
        ...formData,
        userId,
      });
      setLoanApplications([...loanApplications, newLoan]);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating loan application:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Heading size="lg">Loan Applications</Heading>
        <Button colorScheme="purple" onClick={onOpen} leftIcon={<FaFileInvoiceDollar />}>
          Apply for Loan
        </Button>

        {/* Loan Applications Table */}
        <Box bg="white" borderRadius="xl" shadow="sm" overflow="hidden">
          <Table>
            <Thead bg="gray.50">
              <Tr>
                <Th>Loan Amount</Th>
                <Th>Purpose</Th>
                <Th>Interest Rate</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loanApplications.map((loan) => (
                <Tr key={loan.id}>
                  <Td>${loan.loanAmount.toLocaleString()}</Td>
                  <Td>{loan.loanIntent}</Td>
                  <Td>{loan.loanIntRate || 'TBD'}%</Td>
                  <Td>
                    <Badge colorScheme="orange">{loan.status || 'Pending'}</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      {/* Loan Application Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Age</FormLabel>
                  <NumberInput min={18}>
                    <NumberInputField name="personAge" value={formData.personAge} onChange={handleChange} />
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select name="personGender" value={formData.personGender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Education</FormLabel>
                  <Select name="personEducation" value={formData.personEducation} onChange={handleChange}>
                    <option value="">Select Education</option>
                    <option value="High School">High School</option>
                    <option value="Associate">Associate</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="Doctorate">Doctorate</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Home Ownership</FormLabel>
                  <Select name="personHomeOwnership" value={formData.personHomeOwnership} onChange={handleChange}>
                    <option value="">Select Ownership</option>
                    <option value="Own">Own</option>
                    <option value="Rent">Rent</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Others">Others</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Annual Income</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField name="personIncome" value={formData.personIncome} onChange={handleChange} />
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Employment Experience (Years)</FormLabel>
                  <NumberInput min={0} max={40}>
                    <NumberInputField name="personEmpExp" value={formData.personEmpExp} onChange={handleChange} />
                  </NumberInput>
                </FormControl>
                {/* Additional fields */}
                <FormControl isRequired>
                <FormLabel>Previous Loan Defaults</FormLabel>
                <Select
                  name="previousLoanDefaultsOnFile"
                  value={formData.previousLoanDefaultsOnFile}
                  onChange={handleChange}
                >
                  <option value="">Select an Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Loan Amount</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
                  </NumberInput>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Loan Purpose</FormLabel>
                  <Select name="loanIntent" value={formData.loanIntent} onChange={handleChange}>
                    <option value="">Select Purpose</option>
                    <option value="Personal">Personal</option>
                    <option value="Debt Consolidation">Debt Consolidation</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Venture">Venture</option>
                    <option value="Home Improvement">Home Improvement</option>
                  </Select>
                </FormControl>
              </VStack>
              <Button mt={4} colorScheme="purple" type="submit">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Loans;
