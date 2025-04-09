import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./context/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// users
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/Dashboard";

import ManageAllUsers from "./pages/ManageAllUsers";
import ManageAllRestaurants from "./pages/ManageAllRestaurants";
import ManageAllDishes from "./pages/ManageAllDishes";

import AddUser from "./pages/AddUser";
import AddRestaurant from "./pages/AddRestaurant";
import AddDish from "./pages/AddDish";

import UpdateUser from "./pages/UpdateUser";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import UpdateDish from "./pages/UpdateDish";

// error
import ForbiddenPage from "./pages/error/ForbiddenPage";
import InternalServerErrorPage from "./pages/error/InternalServerErrorPage";
import NotFoundPage from "./pages/error/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routes using the AuthLayout component */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" eleament={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["super-admin"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/manage-users" element={<ManageAllUsers />} />
          <Route path="/dashboard/manage-restaurants" element={<ManageAllRestaurants />} />
          <Route path="/dashboard/manage-dishes" element={<ManageAllDishes />} />

          <Route path="/dashboard/manage-users/add-user" element={<AddUser />} />
          <Route path="/dashboard/manage-restaurants/add-restaurant" element={<AddRestaurant />} />
          <Route path="/dashboard/manage-dishes/:restaurantSlug/add-dish" element={<AddDish />} />

          <Route path="/dashboard/manage-users/:username/update" element={<UpdateUser />} />
          <Route path="/dashboard/manage-restaurants/:restaurantSlug/update" element={<UpdateRestaurant />} />
          <Route path="/dashboard/manage-dishes/:restaurantSlug/:dishSlug/update" element={<UpdateDish />} />
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
