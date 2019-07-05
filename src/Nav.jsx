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
            <div className='nav-left'>
              <Link to="/">Find homes</Link>
            </div><div className='nav-right'>
            {localStorage.getItem('userToken')
            ?
              <div>
                <button onClick={this.logOut}>Log out</button>
                <Link to="/wishlist">Wishlist</Link>
              </div>
              :
              <div>
                <Link to="/login">Log in</Link>
                |
                <Link to="/create_account">Create Account</Link>
              </div>
            }
          </div>
        </nav>
      </div>
    )

  }


}

export default Nav;
