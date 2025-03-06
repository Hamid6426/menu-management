import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// INFO
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout><Outlet /></Layout>}>
          <Route index element={<LandingPage />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Catch-All 404 Route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default App;
