import React from 'react';
// npm install --save react-router-dom
import {HashRouter as Router, Route} from 'react-router-dom';
import MapContainer from './MapContainer';
import LogIn from './LogIn';
import WishList from './WishList'

const Routes = (
  <Router>
    <div>
      <Route exact path="/" component={ MapContainer } />
      <Route exact path="/login" component={ LogIn } />
      <Route exact path="/wishlist" component={ WishList } />
    </div>
  </Router>
)

export default Routes;
