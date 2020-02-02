import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { applyForCert} from "../../actions/applicationActions";
import { PropTypes } from "prop-types";
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

class ApplyForCert extends Component {
  constructor() {
    super();
    this.state = {
      authority: "",
      name: "",
      description: "",
      typeOfPacket: "",
      nameOfIngre: "",
      ingreCompany: "",
      ingreCert: "",
      ingreCompanyAdd: "",
      veteCertificate: "",
      finanStatement: "",
      citizenId: "",
      citizenLetter: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange(e){
    this.setState({ [e.target.name]: (e.target.files[0])});
  }

  onSubmit(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append('authority', this.state.authority);
    fd.append('name', this.state.name);
    fd.append('description', this.state.description);
    fd.append('typeOfPacket', this.state.typeOfPacket);
    fd.append('nameOfIngre', this.state.nameOfIngre);
    fd.append('ingreCompany', this.state.ingreCompany);
    fd.append('ingreCompanyAdd', this.state.ingreCompanyAdd);
    fd.append('ingreCert', this.state.ingreCert);
    fd.append('veteCertificate', this.state.veteCertificate);
    fd.append('finanStatement', this.state.finanStatement);
    fd.append('citizenId', this.state.citizenId);
    fd.append('citizenLetter', this.state.citizenLetter);

    for (let pair of fd.entries())
    {
     console.log(pair[0]+ ', '+ pair[1]); 
    }
    console.log(this.state.ingredients)
   this.props.applyForCert(fd, this.props.history);

  }
  render() {
    const style = {
      color: "red"
    };
    
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Halal Certification Form
              </h1>
              <p className="lead text-center">
                Get halal certification for your product from halal authority
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.authority
                    })}
                    placeholder="Authority name"
                    name="authority"
                    value={this.state.authority}
                    onChange={this.onChange}
                  />
                  {errors.authority && (
                    <div className="invalid-feedback">{errors.authority}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Product Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Product Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.typeOfPacket
                    })}
                    placeholder="Type of packaging materials"
                    name="typeOfPacket"
                    value={this.state.typeOfPacket}
                    onChange={this.onChange}
                  />
                  {errors.typeOfPacket && (
                    <div className="invalid-feedback">
                      {errors.typeOfPacket}
                    </div>
                  )}
                </div>
                <div className="form-group">
                    <div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg")}
                          placeholder="Name of Ingredient"
                          name="nameOfIngre"
                          value={this.state.nameOfIngre}
                          
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg")}
                          placeholder="Company Name of Ingredient"
                          name="ingreCompany"
                          value={this.state.ingreCompany}
                          
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg")}
                          placeholder="Company Address of Ingredient"
                          name="ingreCompanyAdd"
                          value={this.state.ingreCompanyAdd}
                          
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg")}
                          placeholder="Ingredient Certificate Id"
                          name="ingreCert"
                          value={this.state.ingreCert}
                          
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                </div>

                <div className="form-group">
                  <label>
                    {" "}
                    <h5>Upload Permit Of Veterinary Service</h5>
                    <input
                      type="file"
                      className={classnames("", {
                        "is-invalid": errors.veteCertificate
                      })}
                      placeholder="Permit of Veterinary Service"
                      name="veteCertificate"
                      //value={this.state.veteCertificate}
                      onChange={this.onFileChange}
                    />
                    
                    {errors.veteCertificate && (
                      <div style={style}>{errors.veteCertificate}</div>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    <h5>Upload Company Annual Financial Statement</h5>
                    <input
                      type="file"
                      className={classnames("", {
                        "is-invalid": errors.finanStatement
                      })}
                      placeholder="Company Annual Financial Statement"
                      name="finanStatement"
                      //value={this.state.finanStatement}
                      onChange={this.onFileChange}
                    />
                    
                    {errors.finanStatement && (
                      <div style={style}>{errors.finanStatement}</div>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    <h5>
                      Upload Citizenship Id Of Any Muslim Person For Reference
                    </h5>
                    <input
                      type="file"
                      className={classnames("", {
                        "is-invalid": errors.citizenId
                      })}
                      placeholder="Citizenship Id"
                      name="citizenId"
                      //value={this.state.citizenId}
                      onChange={this.onFileChange}
                    />
                    
                    {errors.citizenId && (
                      <div style={style}>{errors.citizenId}</div>
                    )}
                  </label>
                </div>
                <div className="form-group">
                  <label>
                    {" "}
                    <h5>
                      Upload Citizenship Letter From Your Selected Musilm Person
                    </h5>
                    <input
                      type="file"
                      className={classnames("", {
                        "is-invalid": errors.citizenLetter
                      })}
                      placeholder="Offer Letter"
                      name="citizenLetter"
                      //value={this.state.citizenLetter}
                      onChange={this.onFileChange}
                    />
                
                    {errors.citizenLetter && (
                      <div style={style}>{errors.citizenLetter}</div>
                    )}
                  </label>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <br/>
              <Link to={`/applications`} className="btn btn-info">
                All Applications
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ApplyForCert.propTypes = {
  applyForCert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { applyForCert }
)(withRouter(ApplyForCert));
