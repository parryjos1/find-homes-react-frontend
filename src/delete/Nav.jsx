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
        <nav className="nav-bar">
            <div className="nav-left">
              <div>
              <img src={process.env.PUBLIC_URL + '/images/house-128.png'} height="40vh"></img>
              </div><div>
              <Link to="/">FIND</Link>
              </div>
            </div><div className="nav-right">
            {localStorage.getItem('userToken')
            ?
              <div>
                <Link to="/wishlist">WISHLIST</Link>
                &nbsp; &nbsp;
                <button class="log-out" onClick={this.logOut}>LOG OUT</button>
              </div>
              :
              <div>
                <Link to="/create_account">SIGN UP</Link>
                &nbsp; &nbsp;
                <Link to="/login">LOG IN</Link>
              </div>
            }
          </div>
        </nav>
      </div>
    )

  }


}

export default Nav;
