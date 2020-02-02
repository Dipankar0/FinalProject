import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { applyForCert } from "../../actions/applyForCertActions";

class Status extends Component {
  constructor() {
    super();
    this.state = {
      certificate: "",
      applicationStatus: "",
      appliedDate: ""
    };
  }
  render() {
    const style = {
      margin: "0px",
      padding: "0px",
      width: "1100px",
      height: "530px"
    };
    const { application } = this.props.application;

    return (
      <div style={style}>
        <h2>
          Your application of product for certificate is saved successfully
        </h2>
        <h4>Application Status: {application.applicationStatus}</h4>
        <h4>Application Time: {application.appliedDate}</h4>
        <h4>Certificate ID: {application.certificate}</h4>
        <hr />
        <h3 className="text-center">
          Search Halal Status Here Of Any Product With Product Id
        </h3>
        <div className="input-group align-center">
          <button type="button" class="btn btn-info">
            Search Product
          </button>
          <input type="text" className="form-control" placeholder="search" />
        </div>
      </div>
    );
  }
}
Status.propTypes = {
  applyForCert: PropTypes.func.required,
  auth: PropTypes.object.required,
  application: PropTypes.object.required
};
const mapStateToProps = state => ({
  auth: state.auth,
  application: state.application
});
export default connect(
  mapStateToProps,
  { applyForCert }
)(withRouter(Status));
