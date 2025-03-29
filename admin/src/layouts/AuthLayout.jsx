import React from "react";
import { Outlet } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

export default function AuthLayout() {
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Outlet />
      </Container>
    </>
  );
}
