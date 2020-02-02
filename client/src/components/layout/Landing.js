import React, { Component } from "react";
import { Link } from "react-router-dom";
//mport pic from "../../uploads/pic";
class Landing extends Component {
  render() {
    return (
      <div className="landing">
      <img src={require(`../../uploads/pic.jpg`)} alt="Permit of Veterinary Service"/>
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
          
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Halal Blockchain</h1>
                <p className="lead">
                  {" "}
                  An Application For Blockchain Verified Halal Certificates
                </p>
                <hr />
                <h3>Sign Up for Your Company</h3>

                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
