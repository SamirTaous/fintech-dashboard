import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import Transactions from '../pages/Transactions';
import Cards from '../pages/Cards';
import Investments from '../pages/Investments';
import Goals from '../pages/Goals';
import Rewards from '../pages/Rewards';
import Loans from '../pages/Loans';
import Settings from '../pages/Settings';

function MainContent() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default MainContent;