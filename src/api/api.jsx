// src/api/api.js

import axios from 'axios';

// FIXED: We only need ONE API URL because our mock server handles all routes.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// --- AUTH ---
export const login = async (username, password) => {
  try {
    // FIXED: The path is /auth/login
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    localStorage.setItem('authToken', response.data.token); // Store token on successful login
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// --- ACCOUNTS ---
export const getAccountsbyClientID = async (clientId, token) => {
  try {
    // This endpoint was already correct.
    const response = await axios.get(`${API_URL}/accounts/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch accounts');
  }
};

// --- TRANSACTIONS ---
// FIXED: Renamed for clarity and corrected the endpoint.
export const getTransactionsByAccountId = async (accountId, token) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/account/${accountId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch transactions');
  }
};

// --- CARDS ---
// NEW: Added the missing function to fetch cards.
export const fetchCardsByClientId = async (clientId, token) => {
  try {
    const response = await axios.get(`${API_URL}/cards/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch cards');
  }
};

// --- LOANS ---
// FIXED: Corrected the fetch endpoint.
export const fetchLoanApplications = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/loans/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch loan applications');
  }
};

// FIXED: Corrected the create endpoint (was posting to the base URL).
export const createLoanApplication = async (loanData, token) => {
  try {
    const response = await axios.post(`${API_URL}/loans`, loanData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error)
 {
    throw error.response ? error.response.data : new Error('Failed to create loan application');
  }
};