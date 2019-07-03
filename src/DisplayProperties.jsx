import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class DisplayProperties extends Component {

  constructor() {
    super();
    this.state = { showComponent: false}
  }

  componentDidMount() {

    console.log(`the polygon token is: this: ${this.props.polygonDrawn}`);
    console.log(`the domain token is: this: ${this.props.domainToken['data']}`);

    const accessToken = this.props.domainToken['data']
    this.searchListings(accessToken)

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
            //Test data
            // {lat: -33.861964921641594, lon: 151.20851723569467},
            // {lat: -33.86207183000841, lon: 151.20469777005746},
            // {lat: -33.86328344881071, lon: 151.19984833615854},
            // {lat: -33.86677566563024, lon: 151.19989125150278},
            // {lat: -33.869412551022236, lon: 151.20229451078012},
            // {lat: -33.87048153541003, lon: 151.20881764310434},
            // {lat: -33.868949320296856, lon: 151.2121221246107},
            // {lat: -33.866419323519466, lon: 151.21473996060922},
            // {lat: -33.8642812396206, lon: 151.21529786008432},
            // {lat: -33.86192928548957, lon: 151.20825974362924}
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
    }).catch(err => console.error(err.response.data))
  } // end of searchListing


  render() {


    return(

      <div>
        <h1>Hello there</h1>
      </div>

    )
  }
}

export default DisplayProperties
