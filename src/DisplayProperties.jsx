import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


class DisplayProperties extends Component {

  constructor() {
    super();
    this.state = {
      showComponent: false,
      propertyResults: '',
    }
  }

  componentDidMount() {

    console.log(`the polygon token is: this: ${this.props.polygonDrawn}`);
    console.log(`the domain token is: this: ${this.props.domainToken['data']}`);

    // Access the domain token that was loaded in the MapContainer Component
    // and passed down from MapComponent State as domainToken
    const accessToken = this.props.domainToken['data']

    // Run function that queries Domain API for properties
    this.searchListings(accessToken);


  }

  searchListings = (accessToken) => {
      console.log(`the polygon is: ${this.props.polygonDrawn}`);
  return axios.post(`https://api.domain.com.au/v1/listings/residential/_search`,
  {
      "listingType": "Sale",
      "geoWindow": {

        "polygon": {
          "points":
            this.props.polygonDrawn

        }
      },

    },
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(result => {
        const { data } = result;
        console.log('hello array:', data);
        this.setState({propertyResults: data})
    }).catch(err => console.error(err.response.data))
  } // end of searchListing


  render() {


    return(

      <div>
        {
          this.state.propertyResults.length > 0
          ?
          <ul>
            { this.state.propertyResults.map(p =>
              <div>
              <li key={p.listing.id}>
                {p.listing.propertyDetails.displayableAddress}
                <br />
                {p.listing.id}
                <br />
                <img src={p.listing.media[0].url} height="300" width="400"></img>
                <br />
              </li>
              <br></br>
              </div>
            )}
          </ul>
         :
         <p>propertyResults is still empty</p>
        }
      </div>

    )
  }
}

export default DisplayProperties
