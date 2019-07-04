import React from 'react';
// npm install --save react-router-dom
import {HashRouter as Router, Route} from 'react-router-dom';
import MapContainer from './MapContainer';
import LogIn from './LogIn';
import WishList from './WishList';
import ShowListing from './ShowListing';
import SearchedShowListings from './SearchedShowListings';
import Nav from './Nav';

// <Nav history={window.history}>
// path without exact allows the nav component to render on every page with

const Routes = (
  <Router>
    <div>
      <Route path="/" component={ Nav } />
      <Route exact path="/" component={ MapContainer } />
      <Route exact path="/login" component={ LogIn } />
      <Route exact path="/wishlist" component={ WishList } />
      <Route exact path="/listing/:id" component={ ShowListing }/>
      <Route exact path="/searchlistings" component={ SearchedShowListings }/>
    </div>
  </Router>
)

export default Routes;
