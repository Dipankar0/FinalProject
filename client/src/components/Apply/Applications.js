import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ApplicationItem from './ApplicationItem';
import {getApplications} from '../../actions/applicationActions';

class Applications extends Component{
    componentDidMount(){
        this.props.getApplications();
    };

    render(){
        const {applications} = this.props.application;
        const {user} = this.props.auth;
        let applicationItems;

        if(applications.length > 0){
         applicationItems = applications.map(application => (
            <ApplicationItem key={application.id} application={application}/>
         ));   
        }else {
            applicationItems = <h4>No Application Found...</h4>
        }
        return(
            <div className="applications">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Welcome <strong style={{color: '#4A90E2'}}>{user.name}</strong></h1>
                            <p className="lead text-center">
                                All your applications for halal certificates are here
                            </p>
                            {applicationItems}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Applications.propTypes = {
    application: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getApplications: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    application: state.application
});

export default connect(mapStateToProps, {getApplications})(Applications);