import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class ApplicationItem extends Component{
    render(){
        const {application} = this.props;
        //console.log(application);
        return(
            <div className="card card-body bg-light mb-3">
                <div className="row">
                    <div className="col-lg-10 col-md-10 col-8">
                        <p><strong>Application Name: </strong>{application.name}</p>
                        <p><strong>Application Time: </strong><Moment format="">{application.appliedDate}</Moment></p>
                        <p><strong>Application ID: </strong>{application._id}</p>
                        <Link to={`/application/${application._id}`} className="btn btn-info">
                            View Application
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

ApplicationItem.PropTypes ={
    application: PropTypes.object.isRequired
}
export default ApplicationItem;