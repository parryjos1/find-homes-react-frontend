import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class ShowListing extends Component {
  constructor(){
    super();
    this.state = {
      listing: {},
      listingImages: [],
      price: ''
    }
  }


  componentDidMount(){
    const domainId = this.props.match.params.id;
    this.getDomainTokenAndFetchListing(domainId);

  }

  getDomainTokenAndFetchListing = (domainId) => {
     axios.get("http://localhost:3000/domain_token")
     .then(result => {
       console.log(`The domain token is:`, result.data.data);
       const domainToken = result.data.data;
       this.getListingById( domainId, domainToken );
       // this.setState({domain_token: result.data})
     })
  }

  getListingById = (listingId, accessToken) => {
  return axios.get(`https://api.domain.com.au/v1/listings/${listingId}`, {
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      }
  }).then(result => {
      console.log(result.data);
      this.setState({
        listing: result.data,
        listingImages: result.data.media,
        price: result.data.priceDetails.displayPrice
      })
  }).catch(err => console.error(err))
  }

  render(){
    return(
      <div>
        <h2>{this.state.listing.headline}</h2>
        <p><strong>Bathrooms</strong>: {this.state.listing.bathrooms}</p>
        <p><strong>Bedrooms</strong>: {this.state.listing.bedrooms}</p>
        <p><strong>Car spaces</strong>: {this.state.listing.carspaces}</p>

        <p><strong>Price</strong>: {this.state.price}</p>


          {
            this.state.listingImages.length > 0
            ?
            this.state.listingImages.map( (image, index) => (
              <img className="show-images" key={index} src={image.url}/>
            ))
            :
            <p>loading</p>
          }
        <p>{this.state.listing.description}</p>


      </div>
    )
  }

}

export default ShowListing;