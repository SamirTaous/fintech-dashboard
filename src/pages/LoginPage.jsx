import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Icon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { motion } from 'framer-motion';
import { FaCreditCard } from 'react-icons/fa';

// Re-introducing Motion components for animations
const MotionBox = motion(Box);

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // No changes to logic, it's solid.
  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const { token } = await login(username, password);
      localStorage.setItem('authToken', token);

      toast({
        title: 'Login Successful',
        description: "Welcome back! You'll be redirected shortly.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });

      setTimeout(() => navigate('/overview'), 1500);
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your username and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setIsLoading(false);
    }
  };

  return (
    <Box
      minH="100vh"
      // --- THEME FIX: Re-instating your original brand gradient ---
      bgGradient="linear(to-br, #9747FF, #7B3FE4)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={4} mb={8} align="center">
            {/* Keeping the logo, but making it white for better contrast on purple */}
            <Icon as={FaCreditCard} w={10} h={10} color="whiteAlpha.800" />
            <Heading as="h1" size="xl" color="white" fontWeight="bold">
              Welcome to Modern Banking
            </Heading>
            <Text color="whiteAlpha.900">
              Access your account securely.
            </Text>
          </VStack>

          <MotionBox
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.2 }}
            // --- THEME FIX: Using your white card design ---
            bg="white"
            p={8}
            rounded="xl"
            shadow="2xl"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl isInvalid={!!errors.username}>
                  {/* --- THEME FIX: Text color for a white background --- */}
                  <FormLabel color="gray.600">Username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="demo@asmasbank.com"
                    size="lg"
                    // --- THEME FIX: Standard input style for white bg ---
                    _focus={{
                      borderColor: "purple.500",
                      boxShadow: "0 0 0 1px #805AD5", // Corresponds to purple.500
                    }}
                  />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel color="gray.600">Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      _focus={{
                        borderColor: "purple.500",
                        boxShadow: "0 0 0 1px #805AD5",
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        color="gray.400"
                        _hover={{ color: 'gray.600' }}
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Button
                  type="submit"
                  size="lg"
                  width="full"
                  isLoading={isLoading}
                  // --- THEME FIX: Using your high-contrast black button style ---
                  bg="gray.900"
                  color="white"
                  fontWeight="bold"
                  _hover={{ bg: "black" }}
                  _active={{ bg: "gray.700" }}
                  as={motion.button}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <HStack justify="space-between" mt={6}>
              {/* --- THEME FIX: Using your brand's purple for links, which looks great on white --- */}
              <Link color="purple.600" fontSize="sm" fontWeight="500" _hover={{ textDecoration: 'underline' }}>
                Forgot Password?
              </Link>
              <Link color="purple.600" fontSize="sm" fontWeight="500" _hover={{ textDecoration: 'underline' }}>
                Create Account
              </Link>
            </HStack>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
}