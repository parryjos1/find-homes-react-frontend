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
        <h1 className="title">Find Homes</h1>
        <nav className='nav-bar'>
            <div className='nav-left'>
              <Link to="/">Find homes</Link>
            </div><div className='nav-right'>
            {localStorage.getItem('userToken')
            ?
              <div>
                <Link to="/wishlist">Wishlist</Link>
                |
                <button onClick={this.logOut}>Log out</button>
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
