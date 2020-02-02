import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {setCertificate} from '../../actions/certificateActions';
import {setBlockProduct} from '../../actions/blockChainActions';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class Certificate extends Component {
    constructor(){
        super();
        this.state = {
            productId: "",
            productName: "",
            companyName: "",
            companyAdd: "",
            description: "",
            certificateId: "",
            authorityName: ""
        };
    }
    componentDidMount(){
        this.props.setCertificate(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.certificate.certificate){
            const {certificate} = nextProps.certificate;

            certificate._id = !isEmpty(certificate._id) ? certificate._id : '';
            certificate.applicationId = !isEmpty(certificate.applicationId) ? certificate.applicationId : '';
            certificate.productName = !isEmpty(certificate.productName) ? certificate.productName : '';
            certificate.companyName = !isEmpty(certificate.companyName) ? certificate.companyName : '';
            certificate.companyAdd = !isEmpty(certificate.companyAdd) ? certificate.companyAdd : '';
            certificate.companyAdd = !isEmpty(certificate.companyAdd) ? certificate.companyAdd : '';
            certificate.description = !isEmpty(certificate.description) ? certificate.description : '';
            certificate.authorityName = !isEmpty(certificate.authorityName) ? certificate.authorityName : '';

            this.setState({
                productId: certificate.applicationId,
                productName: certificate.productName,
                companyName: certificate.companyName,
                companyAdd: certificate.companyAdd,
                description: certificate.description,
                certificateId: certificate._id,
                authorityName: certificate.authorityName
                });            
        }
        console.log(this.state.productId);
            
    }

    componentDidUpdate(){
        console.log(this.state.productId);
        const newProduct = {
            $class: "org.example.biznet.Product",
            productId: this.state.productId,
            productName: this.state.productName,
            productCompany: this.state.companyName,
            companyAdd: this.state.companyAdd,
            description: this.state.description,
            certificateId: this.state.certificateId,
            rejected: "False",
            auth: `resource:org.example.biznet.Authority#${this.state.authorityName}`
        };
        this.props.setBlockProduct(newProduct);
    }

    render(){
        const {certificate} =this.props.certificate;
        console.log(certificate.applicationId);
        
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
                
                <div>
                <Link to={`/authorityApplication/${certificate.applicationId}`} className="btn btn-info">
                            View Application
                </Link>
                </div>
            </div>
        );
    }
};
Certificate.PropTypes = {
    setCertificate: PropTypes.func.isRequired,
    setBlockProduct: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    certificate: state.certificate
});
export default connect(mapStateToProps, {setCertificate, setBlockProduct})(withRouter(Certificate));