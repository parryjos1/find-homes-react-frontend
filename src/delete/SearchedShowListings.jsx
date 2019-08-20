import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchedShowListings extends Component {

  constructor() {
    super();
    this.state = {
      propertyResults: '',
      domainToken: ''
    }
  }

  // Method to pull data passed down when we routed to the state
  updateState = () => {
    this.setState({
      domainToken: this.props.history.location.state.domainToken,
      bedrooms: this.props.history.location.state.bedrooms,
      bathrooms: this.props.history.location.state.bathrooms,
      max_price: this.props.history.location.state.max_price,
      suburb: this.props.history.location.state.suburb
    })
  }

  // Updates the state before any HTML is rendered
  componentWillMount() {
    this.updateState()
  }


  componentDidMount() {
    this.searchListings(this.state.domainToken)
  }

  // Query the Domain Database based on search critera
  searchListings = (accessToken) => {
    console.log(`the access token is: ${accessToken}`);
    const tk = this.state.domainToken;
    console.log(`tk isssss: ${tk}`);
  return axios.post(`https://api.domain.com.au/v1/listings/residential/_search`,
    {
      "minBedrooms": this.state.bedrooms,
      "minBathrooms": this.state.bathrooms,
      "maxPrice": this.state.max_price,
      "locations": [
        {
          "suburb": this.state.suburb,
        }
      ],
    },
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(result => {
        const { data } = result;
        console.log('hello array: searchedShowListings', data);
        this.setState({propertyResults: data})
        // this.props.selectedPropCallBack(data)
    }).catch(err => console.error(err.response.data))
  } // end of searchListing


  render() {

    return(

      <div className="component">

      <h1>Listings</h1>

        <div>
          {
            this.state.propertyResults.length > 0
            ?
            this.state.propertyResults.map( p =>
              <Link to={`/listing/${p.listing.id}`}>
                <div className='listings'>
                  <div key={p.listing.id} className='listings-left'>
                    {p.listing.propertyDetails.displayableAddress}
                  </div><div className='listings-right'>
                    <img src={p.listing.media[0].url} ></img>
                    </div>
                  <br></br>
                </div>
              </Link>
            )

           :
           <p>Loading...</p>
          }
        </div>

      </div>

    )
  }
}

export default SearchedShowListings
