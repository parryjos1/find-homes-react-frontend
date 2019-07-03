import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

class WishList extends Component {

  componentDidMount(){
    const userToken = localStorage.getItem('userToken');
    console.log('localStorage in WishList Component', userToken);
    const authStr =  "Bearer " + userToken;
    console.log(authStr);
    axios.get('http://localhost:3000/my_wishlist', { headers: {Authorization: authStr }})
    .then( res =>{
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    })

  } // end of ComponentDidMount

  render(){
    return(
      <div>
        <h2>Your property wishlist</h2>
      </div>
    )

  }

}

export default WishList;
