import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

class Nav extends Component {

  render(){
    return(
      <div>
        <Link to="/">Find homes</Link>
        |
        <Link to="/wishlist">Wishlist</Link>
        |
        <Link to="/login">Log in</Link>
        |
        <span>Log out</span>
      </div>
    )

  }


}

export default Nav;
