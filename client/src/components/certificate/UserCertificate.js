import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {getCertForApp} from '../../actions/certificateActions';
import {getBlockProduct} from '../../actions/blockChainActions';
import Moment from 'react-moment';

class UserCertificate extends Component {
    

    componentDidMount(){
        this.props.getCertForApp(this.props.match.params.id);
        this.props.getBlockProduct();
    }

    render(){
        const {certificate} =this.props.certificate;
        const {blockProducts} =this.props.certificate;
        let blockProductItems;
        if(blockProducts.length>0){
            blockProducts.map(blockProduct => {
                if(blockProduct.productId === certificate.applicationId){
                    blockProductItems = (
                        <div>
                          <h1 className="display-4 text-center"><strong style={{color: '#4A90E2'}}>{certificate.productName} is Blockchain Certified</strong></h1>
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className="">
                                        <div><p><strong style={{color: '#4A90E2'}}>Blockchain Network : </strong><strong style={{color: "#34A76E"}}>{blockProduct.$class}</strong></p></div>
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className="">
                                        <div><p><strong style={{color: '#4A90E2'}}>Authority Domain : </strong><strong style={{color: "#34A76E"}}>{blockProduct.auth}</strong></p></div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            })
        }
        return(
            <div>
            <h1 className="display-4 text-center">Certificate of: <strong style={{color: '#4A90E2'}}>{certificate.productName}</strong></h1>
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                           <div><p><strong style={{color: '#4A90E2'}}>Certificate ID : </strong><strong style={{color: "#34A76E"}}>{certificate._id}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                           <div><p><strong style={{color: '#4A90E2'}}>Application ID : </strong><strong style={{color: "#34A76E"}}>{certificate.applicationId}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Name : </strong><strong style={{color: "#34A76E"}}>{certificate.productName}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Comapny : </strong><strong style={{color: "#34A76E"}}>{certificate.companyName}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Comapny Address : </strong><strong style={{color: "#34A76E"}}>{certificate.companyAdd}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Description : </strong><strong style={{color: "#34A76E"}}>{certificate.description}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Certificate Authority : </strong><strong style={{color: "#34A76E"}}>{certificate.authorityName}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                        <div><p><strong style={{color: '#4A90E2'}}>Issue Date : </strong><strong style={{color: "#34A76E"}}><Moment format="">{certificate.startDate}</Moment></strong></p></div>
                        </span>
                    </div>
                </div>
                </div>
                {blockProductItems}
                <div>
                <Link to={`/application/${certificate.applicationId}`} className="btn btn-info">
                            View Application
                </Link>
                </div>
            </div>
        );
    }
};
UserCertificate.PropTypes = {
    getCertForApp: PropTypes.func.isRequired,
    getBlockProduct: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    certificate: state.certificate
});
export default connect(mapStateToProps, {getCertForApp, getBlockProduct})(withRouter(UserCertificate));