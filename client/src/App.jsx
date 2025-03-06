import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// INFO
import Layout from './layouts/Layout';
import HomePage from './pages/info/HomePage'
import About from './pages/info/About';
import Contact from './pages/info/Contact';
import Blogs from './pages/info/Blogs';
import SearchMenu from './pages/info/SearchMenu';
import HowToUse from './pages/info/HowToUse';

// AUTH
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// ADMIN
import AdminLayout from './layouts/AdminLayout';
import CreateStore from './pages/admin/CreateStore';
import AccountSettings from './pages/admin/AccountSettings';
import AdminDashboard from './pages/admin/AdminDashboard';
import Stores from './pages/admin/Stores';
import Menu from './pages/admin/Menu';

// MANAGER
import ManagerLayout from './layouts/ManagerLayout';
import ManageMenu from './pages/manager/ManageMenu';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManageUser from './pages/manager/ManageUser';
import Settings from './pages/manager/Settings';

// COOK
import CuisineLayout from './layouts/CuisineLayout';
import CuisineDashboard from './pages/cuisine/CuisineDashboard';

// CUSTOMER
import CustomerLayout from './layouts/CustomerLayout';
import CustomerMenu from './pages/customer/CustomerMenu';

// WAITER
import WaiterLayout from './layouts/WaiterLayout';
import WaiterDashboard from './pages/waiter/WaiterDashboard';

// OTHER
import NotFound from './pages/other/NotFound';
import StoreDetail from './pages/admin/StoreDetails';
import WorkersList from './pages/admin/WorkersList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Outlet /></Layout>}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/blogs" element={ <Blogs /> } />
        <Route path="/how-to-use" element={ <HowToUse /> } />
        <Route path="/search-menu" element={ <SearchMenu /> } />
      </Route>

      {/* AUTH */}
      <Route path="/auth" element={<AuthLayout><Outlet /></AuthLayout>}>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="register" element={ <Register /> } />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="login" element={ <Login /> } />
        <Route path="forgot-password" element={ <ForgotPassword /> } />
        <Route path="reset-password" element={ <ResetPassword /> } />
      </Route>

      {/* admin Routes */}
      <Route path="/admin" element={<AdminLayout><Outlet /></AdminLayout>}>
        <Route index element={<Navigate replace to="/admin/dashboard" />} />
        <Route path="dashboard" element={ <AdminDashboard /> } />
        <Route path="stores" element={ <Stores /> } />
        <Route path="create-store" element={ <CreateStore /> } />
        <Route path="menu" element={ <Menu /> } />
        <Route path="workers" element={ <WorkersList /> } />
        <Route path="stores/:id" element={<StoreDetail />} />
        <Route path="account-settings" element={ <AccountSettings /> } />
        <Route path="*" element={<Navigate replace to="/admin/dashboard" />} />
      </Route>

      {/* Manager Routes */}
      <Route path="/manager" element={<ManagerLayout><Outlet /></ManagerLayout>}>
        <Route index element={<Navigate replace to="/manager/dashboard" />} />
        <Route path="dashboard" element={ <ManagerDashboard /> } />
        <Route path="manage-menu" element={ <ManageMenu /> } />
        <Route path="manage-user" element={ <ManageUser /> } />
        <Route path="settings" element={ <Settings /> } />
        <Route path="*" element={<Navigate replace to="/manager/dashboard" />} />
      </Route>

      {/* Cuisine Routes */}
      <Route path="/cuisine" element={<CuisineLayout><Outlet /></CuisineLayout>}>
        <Route path="dashboard" element={ <CuisineDashboard /> } />
        <Route path="*" element={<Navigate replace to="/cuisine/dashboard" />} />
      </Route>

      {/* Waiter Routes */}
      <Route path="/waiter" element={<WaiterLayout><Outlet /></WaiterLayout>}>
        <Route path="dashboard" element={ <WaiterDashboard /> } />
        <Route path="*" element={<Navigate replace to="/waiter/dashboard" />} />
      </Route>

      {/* Customer Routes */}
      <Route path="/customer" element={<CustomerLayout><Outlet /></CustomerLayout>}>
        <Route path="menu" element={<CustomerMenu />} />
        {/* <Route path="/category/:category" element={<CategoryPage />} /> */}
        <Route path="*" element={<Navigate replace to="/customer/menu" />} />
      </Route>

      {/* Catch-All 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
