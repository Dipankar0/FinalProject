import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class AtApplicationItem extends Component{
    render(){
        const {application} = this.props;
        
        return(
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-8">
                        <p><strong>Application ID: </strong>{application._id}</p>
                        <p><strong>Product Name: </strong>{application.name}</p>
                        <p><strong>Product Company: </strong>{application.companyName}</p>
                        <p><strong>Applied Date: </strong><Moment format="">{application.appliedDate}</Moment></p>
                        <Link to={`/authorityApplication/${application._id}`} className="btn btn-info">
                            View Application
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

AtApplicationItem.PropTypes ={
    application: PropTypes.object.isRequired
}
export default AtApplicationItem;