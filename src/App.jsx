import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout />
      </Router>
    </ChakraProvider>
  );
}

export default App;