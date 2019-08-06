import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import MapContainer from './components/MapContainer';
import LogIn from './components/LogIn';
import WishList from './components/WishList';
import ShowListing from './components/ShowListing';
import CreateAccount from './components/CreateAccount';
import SearchedShowListings from './components/SearchedShowListings';
import Nav from './components/Nav';
import Footer from './components/Footer'

const Routes = (
  <Router>
    <div>
      <Route path="/" component={ Nav } />
      <Route exact path="/" component={ MapContainer } />
      <Route exact path="/login" component={ LogIn } />
      <Route exact path="/create_account" component={ CreateAccount } />
      <Route exact path="/wishlist" component={ WishList } />
      <Route exact path="/listing/:id" component={ ShowListing }/>
      <Route exact path="/searchlistings" component={ SearchedShowListings }/>
      <Route path="/" component={ Footer } />
    </div>
  </Router>
)

export default Routes;
