import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// users
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Demo from "./pages/public/Demo";
import Home from "./pages/public/Home";
import Pricing from "./pages/public/Pricing";

import SignUpAs from "./pages/auth/SignUpAs";
import AdminRegister from "./pages/auth/AdminRegister";
import UserRegister from "./pages/auth/UserRegister";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// error
import ForbiddenPage from "./pages/error/ForbiddenPage";
import InternalServerErrorPage from "./pages/error/InternalServerErrorPage";
import NotFoundPage from "./pages/error/NotFoundPage";

import Layout from "./layouts/Layout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./context/ProtectedRoute";

import Profile from "./pages/Profile";
import AddAllergies from "./pages/AddAllergies";
import Restaurants from "./pages/RestaurantList";
import ShowRestaurant from "./pages/ShowRestaurant";
import ShowRestaurantMenu from "./pages/ShowRestaurantMenu";

// admins
import Dashboard from "./pages/admin/Dashboard";
import CreateRestaurant from "./pages/admin/CreateRestaurant";
import CreateDish from "./pages/admin/CreateDish";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
import ManageDishes from "./pages/admin/ManageDishes";
import UpdateRestaurant from "./pages/admin/UpdateRestaurant";
import UpdateDish from "./pages/admin/UpdateDish";
import ManageStaff from "./pages/admin/ManageStaff";
import Settings from "./pages/admin/Settings";

function App() {
  return (
    <Routes>
      {/* Routes using the Layout component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/:restaurantSlug" element={<ShowRestaurant />} />
        <Route path="/:restaurantSlug/menu" element={<ShowRestaurantMenu />} />
        {/* Protected route */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager", "user"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-allergies" element={<AddAllergies />} />
        </Route>
      </Route>

      {/* Routes using the AuthLayout component */}
      <Route element={<AuthLayout />}>
        <Route path="/signup-as" element={<SignUpAs />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" eleament={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />

          <Route path="/admin/manage-restaurants" element={<ManageRestaurants />} />
          <Route path="/admin/manage-restaurants/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/admin/manage-restaurants/:restaurantSlug/update-restaurant" element={<UpdateRestaurant />} />

          <Route path="/admin/manage-restaurants/:restaurantSlug/dishes" element={<ManageDishes />} />
          <Route path="/admin/manage-restaurants/:restaurantSlug/create-dish" element={<CreateDish />} />
          <Route path="/admin/manage-restaurants/:restaurantSlug/:dishSlug/update-dish" element={<UpdateDish />} />

          <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin"]} />}>
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/manage-staff" element={<ManageStaff />} />
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
