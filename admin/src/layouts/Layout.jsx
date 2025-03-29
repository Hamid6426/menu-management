import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>Main Layout Header</header>
      <main>
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <footer>Main Layout Footer</footer>
    </div>
  );
}
