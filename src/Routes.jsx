import React from 'react';
// npm install --save react-router-dom
import {HashRouter as Router, Route} from 'react-router-dom';
import MapContainer from './MapContainer';
import LogIn from './LogIn';
import WishList from './WishList';
import ShowListing from './ShowListing';
import Nav from './Nav';

// <Nav history={window.history}>

const Routes = (
  <Router>
    <div>
// path without exact allows the nav component to render on every page with 
      <Route path="/" component={ Nav } />
      <Route exact path="/" component={ MapContainer } />
      <Route exact path="/login" component={ LogIn } />
      <Route exact path="/wishlist" component={ WishList } />
      <Route exact path="/listing/:id" component={ ShowListing }/>
    </div>
  </Router>
)

export default Routes;
