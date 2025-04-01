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
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Routes>
      {/* Routes using the Layout component */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/top-restaurants" element={<TopRestaurants />} />
        <Route path="/restaurant/:restaurantSlug" element={<PreviewRestaurant />} />
        <Route path="/menu/:restaurantSlug/:menuSlug" element={<PreviewMenu />} />
        <Route path="/dish/:restaurantSlug/:menuSlug/:dishId" element={<PreviewDish />} />

        {/* Protected route */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager", "user"]} />}>
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/:username/add-allergies" element={<AddAllergies />} />
        </Route>
      </Route>

      {/* Routes using the AuthLayout component */}
      <Route element={<AuthLayout />}>
        <Route path="/login-as" element={<LoginAs />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" eleament={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin", "manager"]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/:username" element={<Dashboard />} />

          <Route path="/:username/manage-restaurants" element={<GetRestaurants />} />
          <Route path="/:username/manage-restaurants/create-restaurant" element={<CreateRestaurant />} />
          <Route path="/:username/manage-restaurants/:restaurantSlug/update-restaurant" element={<UpdateRestaurant />} />

          <Route path="/:username/:restaurantSlug/menus" element={<GetMenus />} />
          <Route path="/:username/:restaurantSlug/create-menu" element={<CreateMenu />} />
          <Route path="/:username/:restaurantSlug/:menuSlug/update-menu" element={<UpdateMenu />} />

          <Route path="/:username/:restaurantSlug/:menuSlug/dishes" element={<GetDishes />} />
          <Route path="/:username/:restaurantSlug/:menuSlug/create-dish" element={<CreateDish />} />
          <Route path="/:username/:restaurantSlug/:menuSlug/:dishSlug/update-dish" element={<UpdateDish />} />

          <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin"]} />}>
            <Route path="/:username/settings" element={<Settings />} />
            <Route path="/:username/add-manager" element={<AddManager />} />
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
