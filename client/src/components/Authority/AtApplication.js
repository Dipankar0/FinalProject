import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getCurrentAtApp} from '../../actions/applicationActions';
import {getCertForApp} from '../../actions/certificateActions';
import Moment from 'react-moment';

class AtApplication extends Component {
    componentDidMount(){
        this.props.getCurrentAtApp(this.props.match.params.id);
        this.props.getCertForApp(this.props.match.params.id);
    }

    render(){
        const {application} =this.props.application;
        const {certificate} =this.props.certificate;

        let result;
        if(certificate._id){
            if(certificate.rejection){
                result = (
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                           <div><p><strong style={{color: 'red'}}>Application Status : </strong>"Application Rejected"</p></div>
                        </span>
                    </div>
                </div>
                );
            }else {
                result = (
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <span >
                                <div><p style={{color: '#4A90E2'}}><strong>Application Status : </strong>"Certified"</p></div>
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7 col-lg-7 ">
                                <span >
                                <Link className="btn btn-info" to={`/viewCertificate/${application._id}`}>View Certificate</Link> 
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }
        }else {
            result = (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="text-center text-info">
                            <Link to={`/certificate/${application._id}`} className="btn btn-info">
                                Accept
                            </Link>
                            {' '}
                            <Link to={`/reject/${application._id}`} className="btn btn-info">
                                Reject
                            </Link>
                        </span>
                    </div>
                </div> 
            </div>    
            ); 
        }
        const a = "a.gif";
        let vete, finan, citiId, citiLetter, veteurl, finanurl, citiIdurl, citiLetterurl;
        if(application.veteCertificate === undefined){
            vete =a;
            veteurl = require(`../../uploads/${vete}`);
            finan = a; 
            finanurl = require(`../../uploads/${finan}`);
            citiId =a;
            citiIdurl = require(`../../uploads/${citiId}`);
            citiLetter = a; 
            citiLetterurl = require(`../../uploads/${citiLetter}`);
        }else{
            vete = application.veteCertificate;
            veteurl = require(`../../uploads/${vete}`);
            finan = application.finanStatement;
            finanurl = require(`../../uploads/${finan}`);
            citiId = application.citizenId;
            citiIdurl = require(`../../uploads/${citiId}`);
            citiLetter = application.citizenLetter;
            citiLetterurl = require(`../../uploads/${citiLetter}`);
        }

        return(
            <div>
            <h1 className="display-4 text-center">Application Details of: <strong style={{color: '#4A90E2'}}>{application.name}</strong></h1>
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                           <div><p><strong style={{color: '#4A90E2'}}>Application ID : </strong><strong style={{color: "#34A76E"}}>{application._id}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Name : </strong><strong style={{color: "#34A76E"}}>{application.name}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Company : </strong><strong style={{color: "#34A76E"}}>{application.companyName}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Product Description : </strong><strong style={{color: "#34A76E"}}>{application.description}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Type Of Packet : </strong><strong style={{color: "#34A76E"}}>{application.typeOfPacket}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                        <div><p><strong style={{color: '#4A90E2'}}>Application Date : </strong><strong style={{color: "#34A76E"}}><Moment format="">{application.appliedDate}</Moment></strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Ingredient Name : </strong><strong style={{color: "#34A76E"}}>{application.nameOfIngre}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Ingredient Company : </strong><strong style={{color: "#34A76E"}}>{application.ingreCompany}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Ingredient Company Address : </strong><strong style={{color: "#34A76E"}}>{application.ingreCompanyAdd}</strong></p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="">
                            <div><p><strong style={{color: '#4A90E2'}}>Ingredient Status : </strong><strong style={{color: "#E350B4"}}>{application.nameOfIngre} is {application.applicationStatus}</strong></p></div>
                        </span>
                    </div>
                </div>
                </div>
                <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="text-center text-info">
                            <div><p><strong style={{color: '#4A90E2'}}>Permit of Veterinary Service : </strong>{application.veteCertificate}</p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col offset-lg-3 offset-md-3">
                        <img src={veteurl} alt="Permit of Veterinary Service"/>
                    </div>
                </div>
            </div>
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="text-center text-info">
                            <div><p><strong style={{color: '#4A90E2'}}>Company Financial Statement : </strong>{application.finanStatement}</p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col offset-lg-3 offset-md-3">
                        <img src={finanurl} alt="Company Financial Statement"/>
                    </div>
                </div>
            </div>
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="text-center text-info">
                            <div><p><strong style={{color: '#4A90E2'}}>Citizenship Identity Card : </strong>{application.citizenId}</p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col offset-lg-3 offset-md-3">
                        <img src={citiIdurl} alt="Citizenship ID"/>
                    </div>
                </div>
            </div>
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-md-12">
                        <span className="text-center text-info">
                            <div><p><strong style={{color: '#4A90E2'}}>Letter From Citizen: </strong>{application.citizenLetter}</p></div>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col offset-lg-3 offset-md-3">
                        <img src={citiLetterurl} alt="Citizen Letter"/>
                    </div>
                </div>
            </div>
            {result}
                <br/>
                <div>
                <Link to={`/authorityApplications`} className="btn btn-info">
                    All Applications
                </Link>
                </div>
            </div>
        );
    }
};
AtApplication.PropTypes = {
    getCurrentAtApp: PropTypes.func.isRequired,
    getCertForApp: PropTypes.func.isRequired,
    auth: PropTypes.object.required,
    application: PropTypes.object.isRequired,
    certificate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    application: state.application,
    certificate: state.certificate
});
export default connect(mapStateToProps, {getCurrentAtApp, getCertForApp})(AtApplication);