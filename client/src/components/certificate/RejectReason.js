import React, { Component } from "react";
import { connect } from "react-redux";
import  PropTypes  from "prop-types";
import { withRouter } from "react-router-dom";
import {Link} from 'react-router-dom';
import {setRejectReason} from "../../actions/certificateActions";
import {getCertForApp} from '../../actions/certificateActions';


class RejectReason extends Component {
  constructor() {
    super();
    this.state = {
      reason: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    this.props.getCertForApp(this.props.match.params.id);
}

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

 onSubmit(e){
   e.preventDefault();
  const reason = this.state.reason;
  console.log(reason)
  this.props.setRejectReason(reason, this.props.match.params.id);
 }

  render() {
    const {certificate} =this.props.certificate;
    return (
      <div>
        <h3 className="text-center">
          Say Something About Rejecting This Certificate
        </h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" 
            name="reason"
            className="form-control" 
            value ={this.state.reason} 
            placeholder="Reason For Rejection"
            onChange={this.onChange} />
            <br/>
            <input type="submit" className="btn btn-info" />
        </form>
        <br/>
        <div>
        <Link to={`/reject/${certificate.applicationId}`} className="btn btn-info">
            Reject
        </Link>
        </div>
      </div>
    );
  }
}
RejectReason.propTypes = {
  setRejectReason: PropTypes.func.isRequired,
  getCertForApp: PropTypes.func.isRequired,
  certificate: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  certificate: state.certificate
});
export default connect(
  mapStateToProps, {
    setRejectReason, getCertForApp
  }
)(withRouter(RejectReason));
