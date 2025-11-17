import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import DealsPage from './pages/DealsPage';
import CardsPage from './pages/CardsPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
