import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginAs() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up As</h2>
      <div className="row">
        {/* Admin Sign Up Card */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">Admin</h5>
              <p className="card-text">
                Sign up as an admin to own a restaurant, create menus, dishes, and manage your establishment.
              </p>
              <Link to={"/admin-register"} className="btn btn-primary mt-auto">
                Sign Up as Admin
              </Link>
            </div>
          </div>
        </div>
        {/* User Sign Up Card */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center text-center">
              <h5 className="card-title">User</h5>
              <p className="card-text">
                Sign up as a customer to explore restaurants, order dishes, and enjoy the dining experience.
              </p>
              <Link to={"/login"} className="btn btn-success mt-auto">
                Sign Up as User
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
