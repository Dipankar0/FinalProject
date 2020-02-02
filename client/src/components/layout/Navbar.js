import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/halalapplication">
              {" "}
              Apply
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              {" "}
              Search Status
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/login"
              onClick={this.onLogoutClick.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
            <Link className="nav-link" to="/home">
              {" "}
              Search Status
            </Link>
          </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              HBC Application
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            
              
              {isAuthenticated ? authLinks : guestLinks}
            
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
