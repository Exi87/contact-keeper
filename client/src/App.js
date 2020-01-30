import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import ContactState from './components/context/contact/ContactState'
import setAuthToken from './utils/setAuthToken'
import Home from './components/page/Home'
import Footer from './components/page/Footer'
import About from './components/page/About'
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AuthState from './components/context/auth/AuthState';
import AlertState from './components/context/alert/AlertState';
import PrivateRoute from './components/routing/privateRoute'

if(localStorage.token){
  setAuthToken(localStorage.token)
}


const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment >
              <Navbar />
            </Fragment>

            <div className="container">
               <Alerts />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
               
              </Switch>
              
             <Footer />
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>

  );
}

export default App;
