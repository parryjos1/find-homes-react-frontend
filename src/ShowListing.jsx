import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class ShowListing extends Component {


  componentDidMount(){
    const domainId = this.props.match.params.id;
    this.getDomainTokenAndFetchListing(domainId);

  }

  getDomainTokenAndFetchListing = (domainId) => {
     axios.get("http://localhost:3000/domain_token")
     .then(result => {
       console.log(`The result is: ${result}`);
       this.getListingById( domainId, result);
       // this.setState({domain_token: result.data})
     })

     // console.log(`railsDomainTokenRequest is: ${railsDomainTokenRequest}`);
     //
     // return railsDomainTokenRequest
  }

  getListingById = (listingId, accessToken) => {
  return axios.get(`https://api.domain.com.au/v1/listings/${listingId}`, {
      headers: {
          'Authorization': `Bearer ${accessToken}`,
      }
  }).then(result => {
      const { data } = result;
      console.log(data);
  }).catch(err => console.error(err.response.data))
  }

  render(){
    return(
      <div>
        <h1>Hello from show listings</h1>
        <p>{this.props.match.params.id}</p>
      </div>
    )
  }

}

export default ShowListing;
