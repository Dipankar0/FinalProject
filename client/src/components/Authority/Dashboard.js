import React, { Component } from "react";
import { connect } from "react-redux";
import  PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { applyForCert } from "../../actions/applicationActions";

import AtApplications from "../Authority/AtApplications";

class Dashboard extends Component {
  render() {
    const { application } = this.props.application;

    let applicationContent;

    if(!application){
      applicationContent = "There is no application for halal certificate"
    }else{
      applicationContent = <AtApplications/>
    }

    return (
      <div>
        {applicationContent}
      </div>
    );
  }
}
Dashboard.PropTypes = {
  applyForCert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.atAuth,
  application: state.application
});
export default connect(
  mapStateToProps,
  { applyForCert }
)(withRouter(Dashboard));
