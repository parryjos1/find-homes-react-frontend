import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

class Nav extends Component {

  logOut = () => {
    console.log('hello');
    localStorage.removeItem('userToken');
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <h2>Find Homes</h2>
        <nav className='nav-bar'>
          <ul id='nav-list'>
            <li><Link to="/">Find homes</Link></li>
            |
            {localStorage.getItem('userToken')
            ?
            <div>
            <li><button onClick={this.logOut}>Log out</button></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            </div>
            :
            <div>
            <li><Link to="/login">Log in</Link></li>
            |
            <li><Link to="/create_account">Create Account</Link></li>
            </div>
            }
          </ul>
        </nav>
      </div>
    )

  }


}

export default Nav;
