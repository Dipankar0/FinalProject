import React, { Component } from "react";
import { connect } from "react-redux";
import  PropTypes  from "prop-types";
import { withRouter } from "react-router-dom";
import {findProduct} from "../../actions/certificateActions";


class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      product: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

 onSubmit(e){
   e.preventDefault();
  const product = this.state.product;
  console.log(product)
  this.props.findProduct(product);
 }

  render() {
    const {certificate} = this.props.certificate;
    console.log(certificate);
    const dontShow = (
      <div>
        <div key={certificate.certHandle}>{certificate.productName}</div>
        <div key={certificate.certHandle}>{certificate.companyName}</div>
        <div key={certificate.certHandle}>{certificate.authorityName}</div>
      </div>
    );

    const show =(
      <div className="card card-body bg-light mb-3">
        <div className="row">
            <div className="col-lg-10 col-md-10 col-8">
                <p><strong>Product Name: </strong>{certificate.productName}</p>
                <p><strong>Product Company Name: </strong>{certificate.companyName}</p>
                <p><strong>Halal Authority Name: </strong>{certificate.authorityName}</p>
                <p><strong>Certified At: </strong>{certificate.startDate}</p>
            </div>
        </div>
      </div>
      );

    return (
      <div>
        <h3 className="text-center">
          Search Halal Status Here Of Any Product With Product Name
        </h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" 
            name="product"
            className="form-control" 
            value ={this.state.product} 
            placeholder="search"
            onChange={this.onChange} />
            <input type="submit" className="btn btn-info" />
        </form>
        {certificate._id ? show : dontShow}
      </div>
    );
  }
}
UserHome.propTypes = {
  certificate: PropTypes.object.isRequired,
  findProduct: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  certificate: state.certificate
});
export default connect(
  mapStateToProps, {
    findProduct
  }
)(withRouter(UserHome));
