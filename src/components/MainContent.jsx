import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import Transactions from '../pages/Transactions';
import Cards from '../pages/Cards';
import Loans from '../pages/Loans';
import Settings from '../pages/Settings';
import Accounts from '../pages/Accounts';
import Bills from '../pages/Bills';

function MainContent() {
  return (
    <Routes>
      <Route path="/overview" element={<Overview />} />
      <Route path='/accounts' element={<Accounts/>}> </Route>
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/loans" element={<Loans />} />
      <Route path="/bills" element={<Bills />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default MainContent;