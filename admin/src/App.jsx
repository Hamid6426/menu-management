import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./components/ProtectRoute";

import Register from "./pages/user/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Restaurants from "./pages/dashboard/Restaurants";

import ForbiddenPage from "./pages/ForbiddenPage";
import InternalServerErrorPage from "./pages/InternalServerErrorPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddAllergies from "./pages/dashboard/AddAllergies";
import Menu from "./pages/dashboard/Menu";
import SignUpAs from "./pages/SignUpAs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes using the AuthLayout component */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up-as" element={<SignUpAs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-passowrd/:resetToken"
            element={<ResetPassword />}
          />
        </Route>

        {/* Routes using the Layout component */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/:restaurantId/menu" element={<Menu />} />

          {/* Protected route */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "super-admin", "manager", "user"]}
              />
            }
          >
            <Route path="/:userId/add-allergies" element={<AddAllergies />} />
          </Route>
        </Route>

        {/* Error Routes */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<InternalServerErrorPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* Redirect unknown routes to 404 */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
