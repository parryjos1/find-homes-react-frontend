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

    //fixes bug of having no maximum
    // const maxPrice = this.props.max_price
    // if (maxPrice === 0) {
    //   this.setState({max_price: 100000000})
    // } else {
    //   this.setState({max_price:this.props.max_price})
    // }

    this.setState({
      domainToken: this.props.domainToken,
      bedrooms: this.props.bedrooms,
      bathrooms: this.props.bathrooms,
      max_price: this.props.max_price,
      // max_price: maxPrice,
      suburb: this.props.suburb
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
      <div className="listings-container">
        {
          this.state.propertyResults.length > 0
          ?
          this.state.propertyResults.map( p =>
            <div key={p.listing.id} className="listings">
              <div>
                <Link to={`/listing/${p.listing.id}`}>
                  <img className="listings-img" src={p.listing.media[0].url} ></img>
                </Link>
              </div>
              <Link to={`/listing/${p.listing.id}`}>
                <div className='listings-headline-address'>
                  <p>{p.listing.propertyDetails.displayableAddress}</p>
                </div>
                <div className="home-icons">
                  <img src={process.env.PUBLIC_URL + '/images/icon-bed.png'}></img>
                  <span class="home-icons-numbers">{p.listing.propertyDetails.bedrooms}</span>
                  <span class="home-icons-numbers"><img src={process.env.PUBLIC_URL + '/images/icon-bathtub.png'}></img>
                  {p.listing.propertyDetails.bathrooms}</span>
                <span class="home-icons-numbers cars"><img src={process.env.PUBLIC_URL + '/images/icon-car.png'}></img>
                  {p.listing.propertyDetails.carspaces}</span>
                </div>
              </Link>
            </div>
          )
         :
         <p>Loading...</p>
        }
      </div>


    )
  }
}

export default SearchedShowListings
