import {
  Box,
  VStack,
  Heading,
  Text,
  Switch,
  Select,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  useToast,
  Grid,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputRightElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  FaBell,
  FaLock,
  FaGlobe,
  FaUserShield,
  FaCreditCard,
  FaEnvelope,
  FaMobile,
  FaCheckCircle,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { useState } from 'react';

const SettingSection = ({ icon, title, description, children }) => (
  <Box bg="white" p={6} borderRadius="xl" shadow="sm">
    <VStack align="stretch" spacing={6}>
      <HStack spacing={4}>
        <Icon as={icon} boxSize={5} color="purple.500" />
        <Box>
          <Heading size="sm" mb={1}>{title}</Heading>
          <Text fontSize="sm" color="gray.600">{description}</Text>
        </Box>
      </HStack>
      <Box>{children}</Box>
    </VStack>
  </Box>
);

function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack align="start" spacing={1}>
          <Heading size="lg">Settings</Heading>
          <Text color="gray.600">Manage your account preferences and security</Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {/* Notifications Section */}
          <SettingSection
            icon={FaBell}
            title="Notifications"
            description="Control how you receive notifications"
          >
            <VStack align="stretch" spacing={4}>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <VStack align="start" spacing={0}>
                  <FormLabel mb={0}>Email Notifications</FormLabel>
                  <Text fontSize="sm" color="gray.500">Receive updates about your account</Text>
                </VStack>
                <Switch colorScheme="purple" defaultChecked />
              </FormControl>
              
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <VStack align="start" spacing={0}>
                  <FormLabel mb={0}>SMS Notifications</FormLabel>
                  <Text fontSize="sm" color="gray.500">Get alerts via text message</Text>
                </VStack>
                <Switch colorScheme="purple" />
              </FormControl>

              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <VStack align="start" spacing={0}>
                  <FormLabel mb={0}>Push Notifications</FormLabel>
                  <Text fontSize="sm" color="gray.500">Receive alerts on your device</Text>
                </VStack>
                <Switch colorScheme="purple" defaultChecked />
              </FormControl>
            </VStack>
          </SettingSection>

          {/* Security Section */}
          <SettingSection
            icon={FaUserShield}
            title="Security"
            description="Protect your account"
          >
            <VStack align="stretch" spacing={4}>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <VStack align="start" spacing={0}>
                  <HStack>
                    <FormLabel mb={0}>Two-Factor Authentication</FormLabel>
                    <Badge colorScheme="green">Recommended</Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.500">Add an extra layer of security</Text>
                </VStack>
                <Switch colorScheme="purple" />
              </FormControl>

              <Divider />

              <VStack align="stretch" spacing={2}>
                <Text fontWeight="medium">Password</Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      <Icon as={showPassword ? FaEyeSlash : FaEye} />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </VStack>
            </VStack>
          </SettingSection>

          {/* Preferences Section */}
          <SettingSection
            icon={FaGlobe}
            title="Preferences"
            description="Customize your banking experience"
          >
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Default Currency</FormLabel>
                <Select defaultValue="USD">
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select defaultValue="en">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Time Zone</FormLabel>
                <Select defaultValue="UTC-5">
                  <option value="UTC-8">Pacific Time (PT)</option>
                  <option value="UTC-7">Mountain Time (MT)</option>
                  <option value="UTC-6">Central Time (CT)</option>
                  <option value="UTC-5">Eastern Time (ET)</option>
                </Select>
              </FormControl>
            </VStack>
          </SettingSection>

          {/* Contact Information */}
          <SettingSection
            icon={FaEnvelope}
            title="Contact Information"
            description="Update your contact details"
          >
            <VStack align="stretch" spacing={4}>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input defaultValue="john.doe@example.com" />
              </FormControl>

              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input defaultValue="+1 (555) 123-4567" />
              </FormControl>

              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Text fontSize="sm" color="green.500">All contact information is verified</Text>
              </HStack>
            </VStack>
          </SettingSection>
        </Grid>

        {/* Advanced Settings */}
        <Box bg="white" p={6} borderRadius="xl" shadow="sm">
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton px={0}>
                <HStack flex="1">
                  <Icon as={FaCreditCard} color="purple.500" />
                  <Text fontWeight="medium">Advanced Settings</Text>
                </HStack>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="stretch" spacing={4}>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Enable International Transfers</FormLabel>
                    <Switch colorScheme="purple" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Auto-lock after inactivity</FormLabel>
                    <Switch colorScheme="purple" defaultChecked />
                  </FormControl>
                  <FormControl display="flex" alignItems="center" justifyContent="space-between">
                    <FormLabel mb={0}>Transaction Notifications Threshold</FormLabel>
                    <Input type="number" defaultValue="1000" w="100px" />
                  </FormControl>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        {/* Save Button */}
        <Button
          colorScheme="purple"
          size="lg"
          onClick={handleSave}
          w={{ base: "full", md: "auto" }}
          alignSelf="flex-end"
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}

export default Settings;

