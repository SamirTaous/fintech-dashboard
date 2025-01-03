import axios from 'axios';

const API_URL1 = 'http://localhost:8081/auth';
const API_URL2 = 'http://localhost:8080/api/Operation'

// Check credentials in login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch transactions by client ID
export const getTransactionsByClientId = async (clientId) => {
    try {
      const response = await axios.get(`${API_URL2}/ConsulterOperation/${clientId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  };