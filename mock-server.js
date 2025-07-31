// mock-server.js

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Load mock data
const mockData = JSON.parse(fs.readFileSync(path.join(__dirname, 'mock-data.json'), 'utf8'));

// --- AUTH ---
app.post('/auth/login', (req, res) => {
  console.log('🔐 Login attempt');
  const { username, password } = req.body;
  if (username && password) {
    console.log('✅ Login successful for:', username);
    res.json(mockData.auth.login);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- ACCOUNTS ---
app.get('/accounts/client/:clientId', (req, res) => {
  console.log('🏦 Fetching accounts for client:', req.params.clientId);
  const { clientId } = req.params;
  const accounts = mockData.accounts.filter(acc => acc.clientId === clientId);
  res.json(accounts);
});

// --- TRANSACTIONS --- (FIXED: Changed from /operations to /transactions)
app.get('/transactions/account/:accountId', (req, res) => {
  console.log('💳 Fetching transactions for account:', req.params.accountId);
  const { accountId } = req.params;
  // Renamed 'operations' to 'transactions' in mock data for clarity
  const transactions = mockData.transactions.filter(op => op.accountId === accountId);
  res.json(transactions);
});

// --- CARDS --- (FIXED: Added this new endpoint)
app.get('/cards/client/:clientId', (req, res) => {
    console.log('💳 Fetching cards for client:', req.params.clientId);
    const { clientId } = req.params;
    const cards = mockData.cards.filter(card => card.clientId === clientId);
    res.json(cards);
});

// --- LOANS --- (FIXED: Simplified the endpoint)
app.get('/loans/user/:userId', (req, res) => {
  console.log('💰 Fetching loans for user:', req.params.userId);
  const { userId } = req.params;
  // Renamed 'loan-applications' to 'loans' in mock data for clarity
  const loans = mockData.loans.filter(loan => loan.userId === userId);
  res.json(loans);
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀 Mock server running on http://localhost:${PORT}`);
  console.log('\n--- CORRECTED ENDPOINTS ---');
  console.log('  POST /auth/login');
  console.log('  GET  /accounts/client/:clientId');
  console.log('  GET  /cards/client/:clientId       <-- NEW!');
  console.log('  GET  /transactions/account/:accountId  <-- FIXED!');
  console.log('  GET  /loans/user/:userId           <-- FIXED!');
  console.log('---------------------------\n');
});