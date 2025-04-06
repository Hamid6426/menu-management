import React from 'react'

export default function Footer() {
  return (
    <div>
          <footer className="py-4 bg-dark text-white">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} MenuMaster. All rights reserved.</p>
          <div>
            <a href="#" className="text-white mx-2">Privacy</a>|
            <a href="#" className="text-white mx-2">Terms</a>|
            <a href="#" className="text-white mx-2">Contact</a>
          </div>
        </div>
      </footer>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>MenuMaster</h4>
              <p>Making menu management simple and efficient for restaurants worldwide.</p>
            </div>
            <div className="col-md-2">
              <h5>Product</h5>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h5>Company</h5>
              <ul className="footer-links">
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Stay Updated</h5>
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
