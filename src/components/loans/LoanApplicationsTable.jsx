import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
} from '@chakra-ui/react';

const LoanApplicationsTable = ({ loanApplications }) => {
  return (
    <Table variant="simple">
      <Thead bg="purple.50">
        <Tr>
          <Th>Loan Amount</Th>
          <Th>Purpose</Th>
          <Th>Interest Rate</Th>
          <Th>Status</Th>
          <Th>Application Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {loanApplications.map((loan) => (
          <Tr key={loan.id}>
            <Td>
              <Text fontWeight="bold">${loan.loanAmount.toLocaleString()}</Text>
            </Td>
            <Td>{loan.loanIntent}</Td>
            <Td>{loan.loanIntRate || 'TBD'}%</Td>
            <Td>
              <Badge
                colorScheme={
                  loan.status === 'APPROVED'
                    ? 'green'
                    : loan.status === 'REJECTED'
                    ? 'red'
                    : 'yellow'
                }
              >
                {loan.status || 'Pending'}
              </Badge>
            </Td>
            <Td>{new Date(loan.applicationDate).toLocaleDateString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default LoanApplicationsTable;

