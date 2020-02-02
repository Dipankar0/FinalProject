import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {setRejection} from '../../actions/certificateActions';
import {rejectBlockProduct} from '../../actions/blockChainActions'


 class Rejection extends Component {
   componentDidMount(){
     this.props.setRejection(this.props.match.params.id);
     this.props.rejectBlockProduct(this.props.match.params.id);
   }
  render() {
    return (
      <div>
        <div card card-body bg-light mb-3>
          <div className="row">
            <div className="col-md-12">
              <span className="text-center text-info">
                <div><p><strong>The Certificate has got rejected </strong></p></div>
              </span>
            </div>
          </div>
        </div>
        <div>
          <Link to={`/authorityApplications`} className="btn btn-info">
            All Applications
          </Link>
        </div>
      </div>
    )
  }
}

Rejection.PropTypes = {
  setRejection: PropTypes.func.isRequired,
  rejectBlockProduct: PropTypes.func.isRequired,
  certificate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  certificate: state.certificate
});
export default connect(mapStateToProps, {setRejection, rejectBlockProduct})(withRouter(Rejection));