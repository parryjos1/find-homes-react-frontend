import React from 'react';
// npm install --save react-router-dom
import {HashRouter as Router, Route} from 'react-router-dom';
import MapContainer from './MapContainer';
import LogIn from './LogIn';

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ MapContainer } />
      <Route exact path="/login" component={ LogIn } />
    </div>
  </Router>
)

export default Routes;
