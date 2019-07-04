import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const userToken = localStorage.getItem('userToken');
console.log('localStorage in WishList Component', userToken);
const authStr =  "Bearer " + userToken;
console.log(authStr);

class WishList extends Component {
  constructor(){
    super();
    this.state = {
      listings: [],
    }
  }


  componentDidMount(){
    this.getWishList();

  } // end of ComponentDidMount

  getWishList = () => {
    //userToken is stored in localStorage

    axios.get('http://localhost:3000/wishlists', { headers: {Authorization: authStr }})
    .then( res =>{
      console.log(res.data.listings);
      console.log(res.data.name);

      this.setState({
        listings: res.data.listings,
        name: res.data.name
      })

    })
    .catch( err => {
      console.log(err);
    })
  }

  deleteListing = (id) => {
    console.log('delete listing id', id);

    axios.delete(`http://localhost:3000/wishlists/${id}`, { headers: {Authorization: authStr }})
    // { data: { listingId: id }}
    .then( res =>{
      console.log(res);
    }).catch( err => {
        console.log(err);
    })
  }


  render(){
    return(
      <div>
        <h2>Welcome, {this.state.name} </h2>
        <div>
        {
          this.state.listings.length > 0
          ?
          this.state.listings.map( listing => (
              <div key={listing.id} className="listings">
                <div className="listings-left">
                  <p><strong>{listing.headline}</strong></p>
                  <p>{listing.address}</p>
                </div><div className="listings-right">
                  <img src={listing.image}/>
                  <button onClick={ ()=>this.deleteListing(listing.id) }> Delete
                  </button>
                </div>
              </div>
            ))

          :
          <p>loading</p>

        }
      </div>
      </div>
    )

  }

}

export default WishList;
