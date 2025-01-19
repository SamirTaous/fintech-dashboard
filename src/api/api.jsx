import axios from 'axios';

const API_URL1 = 'http://localhost:8081/auth'; // API for authentification
const API_URL2 = 'http://localhost:8084/api' // API for transactions
const API_URL3 = 'http://localhost:8082/api/loan-applications'; // API for loan applications
const API_URL4 = 'http://localhost:8085/accounts'

// API for login (assuming token is returned on login)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch transactions by compte Id with token
export const getTransactionsByCompteId = async (compteId, token) => {
  try {
    const response = await axios.get(`${API_URL2}/Operation/operations/${compteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Create a new loan application
export const createLoanApplication = async (loanData) => {
  try {
    const response = await axios.post(`${API_URL3}`, loanData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all loan applications for the current user
export const fetchLoanApplications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL3}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get account by account id

export const getAccountById = async (accountId) => {
  try {
    const response = await axios.get(`${API_URL4}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    throw error;
  }
};

// Get account by account number

export const getAccountByNumber = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL4}/getacc/${accountNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    throw error;
  }
};


// Fetch accounts by client id 

export const getAccountsbyClientID = async (clientId, token) => {
  try {
    const response = await axios.get(`${API_URL4}/client/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// API FOR ADDING A TRANSFER 

  // Create Virement (Transfer)
  export const addVirement = async (virementData) => {
    try {
      const response = await axios.post(`${API_URL2}/Virement/add-vire`, virementData);
      return response.data;
    } catch (error) {
      console.error('Error adding virement:', error);
      throw error;
    }
  };

