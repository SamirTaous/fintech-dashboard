import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    gold: {
      50: '#FFF9E6',
      100: '#FFF0BF',
      500: '#FFD700',
      600: '#E6C200',
    },
    titanium: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      500: '#718096',
      600: '#4A5568',
    },
    silver: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      500: '#94A3B8',
      600: '#64748B',
    },
    purple: {
      50: '#FAF5FF',
      100: '#E9D8FD',
      200: '#D6BCFA',
      300: '#B794F6',
      400: '#9F7AEA',
      500: '#805AD5',
      600: '#6B46C1',
      700: '#553C9A',
      800: '#44337A',
      900: '#322659',
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'purple.500',
          color: 'white',
          _hover: {
            bg: 'purple.600',
            _disabled: {
              bg: 'purple.500',
            },
          },
          _active: {
            bg: 'purple.700',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'purple.500',
          color: 'purple.500',
          _hover: {
            bg: 'purple.50',
            borderColor: 'purple.600',
            color: 'purple.600',
          },
          _active: {
            bg: 'purple.100',
          },
        },
        ghost: {
          color: 'purple.500',
          _hover: {
            bg: 'purple.50',
            color: 'purple.600',
          },
          _active: {
            bg: 'purple.100',
          },
        },
      },
      defaultProps: {
        colorScheme: 'purple',
      },
    },
  },
});

export default theme;

