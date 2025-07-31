import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- FIX: Defined a color map for our ACTUAL account types ---
const ACCOUNT_TYPE_COLORS = {
  'Checking': '#885AF8', // A nice purple
  'Savings': '#4FD1C5',  // A nice teal
  'Investment': '#F6E05E', // A nice yellow
  'default': '#A0AEC0',    // A fallback gray
};

export const AccountsChart = ({ accounts }) => {
  // --- FIX: Dynamically discover account types from the data ---
  // 1. Get a list of unique account types from the accounts array.
  const accountTypes = [...new Set(accounts.map((account) => account.accountType))];
  
  // 2. Count how many of each type exist.
  const data = accountTypes.map(
    (type) => accounts.filter((account) => account.accountType === type).length
  );

  // 3. Get the correct colors for the discovered types.
  const backgroundColors = accountTypes.map(type => ACCOUNT_TYPE_COLORS[type] || ACCOUNT_TYPE_COLORS.default);

  const chartData = {
    labels: accountTypes,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            if (total === 0) return `${label}: 0 (0.00%)`; // Prevent division by zero
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="purple.600">
        Account Distribution
      </Text>
      <Box height="300px">
        <Pie data={chartData} options={options} />
      </Box>
    </Box>
  );
};