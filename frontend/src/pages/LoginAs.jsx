import React from 'react';

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
              <a href="/admin-login" className="btn btn-primary mt-auto">
                Sign Up as Admin
              </a>
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
              <a href="/login" className="btn btn-success mt-auto">
                Sign Up as User
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
