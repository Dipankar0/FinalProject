import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import store from "./store";

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Home from "./components/layout/Home";
import Register from "./components/auth/Register";
import AtRegister from "./components/auth/AtRegister";
import Login from "./components/auth/Login";
import AtLogin from "./components/auth/AtLogin";
import ApplyForCert from "./components/Apply/ApplyForCert";
import Applications from "./components/Apply/Applications";
import AtApplications from "./components/Authority/AtApplications";
import AtApplication from "./components/Authority/AtApplication";
import Application from "./components/Apply/Application";
import Dashboard from "./components/Authority/Dashboard";
import Certificate from "./components/certificate/Certificate";
import Rejection from "./components/certificate/Rejection";
import ViewCertificate from "./components/certificate/ViewCertificate";
import UserCertificate from "./components/certificate/UserCertificate";
import RejectReason from "./components/certificate/RejectReason";
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/authorityRegister" component={AtRegister} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/authorityLogin" component={AtLogin} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/viewCertificate/:id" component={ViewCertificate} />
              <Route exact path="/userCertificate/:id" component={UserCertificate} />
              <Switch>
              <PrivateRoute exact path="/halalapplication" component={ApplyForCert} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/applications" component={Applications} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/authorityApplications" component={AtApplications} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/application/:id" component={Application} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/authorityApplication/:id" component={AtApplication} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/rejection" component={Rejection} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/certificate/:id" component={Certificate} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/reject/:id" component={Rejection} />
              </Switch>
              <Switch>
              <PrivateRoute exact path="/rejectReason/:id" component={RejectReason} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
