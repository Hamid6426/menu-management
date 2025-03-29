import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./context/ProtectedRoute";

// users
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import LoginAs from "./pages/LoginAs";
import UserRegister from "./pages/UserRegister";
import AdminRegister from "./pages/AdminRegister";
import AddAllergies from "./pages/AddAllergies";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import TopRestaurants from "./pages/TopRestaurants";
import PreviewRestaurant from "./pages/PreviewRestaurant";
import PreviewMenu from "./pages/PreviewMenu";
import PreviewDish from "./pages/PreviewDish";

// admins
import Dashboard from "./pages/admin/Dashboard";
import CreateRestaurant from "./pages/admin/CreateRestaurant";
import CreateMenu from "./pages/admin/CreateMenu";
import CreateDish from "./pages/admin/CreateDish";
import GetRestaurants from "./pages/admin/GetRestaurants";
import GetMenus from "./pages/admin/GetMenus";
import GetDishes from "./pages/admin/GetDishes";
import UpdateRestaurant from "./pages/admin/UpdateRestaurant";
import UpdateMenu from "./pages/admin/UpdateMenu";
import UpdateDish from "./pages/admin/UpdateDish";
import AddManager from "./pages/admin/AddManager";
import Settings from "./pages/admin/Settings";

// error
import ForbiddenPage from "./pages/ForbiddenPage";
import InternalServerErrorPage from "./pages/InternalServerErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* Routes using the Layout component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/top-restaurants" element={<TopRestaurants />} />
        <Route path="/:restaurantId" element={<PreviewRestaurant />} />
        <Route path="/menu/:menuId/preview" element={<PreviewMenu />} />
        <Route path="/dish/:dishId/preview" element={<PreviewDish />} />

        {/* Protected route */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager", "user"]} />}>
          <Route path="/:userId/add-allergies" element={<AddAllergies />} />
        </Route>
      </Route>

      {/* Routes using the AuthLayout component */}
      <Route element={<AuthLayout />}>
        <Route path="/login-as" element={<LoginAs />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/:userId/restaurants" element={<GetRestaurants />} />
          <Route path="/dashboard/:userId/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/dashboard/restaurants/:restaurantId/update" element={<UpdateRestaurant />} />

          <Route path="/dashboard/:restaurantId/menus" element={<GetMenus />} />
          <Route path="/dashboard/:restaurantId/create-menu" element={<CreateMenu />} />
          <Route path="/dashboard/menus/:menuId/update" element={<UpdateMenu />} />

          <Route path="/dashboard/:menuId/dishes" element={<GetDishes />} />
          <Route path="/dashboard/:menuId/create-dish" element={<CreateDish />} />
          <Route path="/dashboard/dishes/:dishId/update" element={<UpdateDish />} />

          <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin"]} />}>
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/add-manager" element={<AddManager />} />
          </Route>
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<InternalServerErrorPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      {/* Redirect unknown routes to 404 */}
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
