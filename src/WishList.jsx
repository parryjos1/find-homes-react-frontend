import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


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

    axios.get('http://localhost:3000/wishlists', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('userToken')
      }
    })
    .then( res =>{
      // console.log(res.data.listings);
      // console.log(res.data.name);

      this.setState({
        listings: res.data.listings,
        name: res.data.name
      })

    })
    .catch( err => {
      console.log(err);
    });
  }

  deleteListing = (id, index) => {
    // console.log('delete listing id', id);
    // console.log('index', index)

    // delete listing from users wishList in the database

    axios.delete(`http://localhost:3000/wishlists/` + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('userToken')
      }
    })

    .then( res =>{
      console.log(res);
      // update page

      // make a copy of the users listings because you cannot change the state directly
      const newListings = [...this.state.listings];
      // console.log(newListings);

      //remove deleted listing via splicing
      newListings.splice(index, 1);
      // console.log(newListings);

      // update this.state.listings
      // so the rendered view no longer shows it
      this.setState({
        listings: newListings
      })
    }).catch( err => {
        console.log(err);
    });
  }


  render(){
    return(
      <div>
        <h2>Welcome, {this.state.name} </h2>
        <div>
        {
          this.state.listings.length > 0
          ?
          this.state.listings.map( (listing, index) => (
              <Link to={`/listing/${listing.domain_id}`}>
                  <div key={listing.id} className="listings">
                    <div className="listings-left">
                      <p><strong>{listing.headline}</strong></p>
                      <p>{listing.address}</p>
                    </div><div className="listings-right">
                      <img src={listing.image}/>
                      <button onClick={ ()=>this.deleteListing(listing.id, index) }> Delete
                      </button>
                    </div>
                  </div>
              </Link>
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
