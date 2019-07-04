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


    // console.log(`The this.propertyResultsis: ${this.propertyResults} `);
    // this.props.selectedPropCallBack(this.propertyResults)


  }

  searchListings = (accessToken) => {
      console.log(`the polygon is: ${this.props.polygonDrawn}`);
  return axios.post(`https://api.domain.com.au/v1/listings/residential/_search`,
  {
      "listingType": "Sale",
      "minBedrooms": this.props.bedrooms,
      "minBathrooms": this.props.bathrooms,
      "maxPrice": this.props.maxPrice,
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
        this.props.selectedPropCallBack(data)
    }).catch(err => console.error(err.response.data))
  } // end of searchListing


  render() {


    return(

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
         <p>propertyResults is still empty</p>
        }
      </div>

    )
  }
}

export default DisplayProperties
