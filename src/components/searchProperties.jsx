import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider, { Range } from 'rc-slider';
import SearchedShowListings from './SearchedShowListings';

import 'rc-slider/assets/index.css';
const wrapperStyle = { width: 400, margin: 50 };

class SearchProperties extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bedrooms: '',
      bathrooms: '',
      max_price: 100000000,
      suburb: '',
      domainToken: '',
      propertySearch: ''
    }
  }

  componentDidMount() {
    this.setState({domainToken: localStorage.getItem('domainToken')})
  }

  onSearchChange = (e) => {
    this.setState({suburb: e.target.value})
  }
  onSliderChangeBedrooms = (e) => {
    // console.log(e);
    this.setState({bedrooms: e})
  }
  onSliderChangeBathrooms = (e) => {
    // console.log(e);
    this.setState({bathrooms: e})
  }
  onSliderChangeMaxPrice = (e) => {
    // console.log(e);

    if (e === 0) {
      this.setState({max_price: 100000000})
    } else {
      this.setState({max_price: e})
    }
  }

  handleSubmit = () => {
    this.setState({propertySearch : 'selected'})
  }


  render(){
    return(
      <div className="searchproperties">


        <form className="search-form-searchproperties" onSubmit={this.handleSubmit}>
          <input id="search-bar-searchproperties" type="text" placeholder="Search suburb e.g. Bronte" onChange={this.onSearchChange} />
        </form>


        <div style={wrapperStyle} className="searchBedrooms">
          <p>Min Bedrooms</p>
          <Slider min={0} defaultValue={0} marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4}} step={null} onChange={this.onSliderChangeBedrooms} max={4} />
        </div>
        <div style={wrapperStyle} className="searchBathrooms">
          <p>Min Bathrooms</p>
          <Slider min={0} defaultValue={0} marks={{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4}} step={null} onChange={this.onSliderChangeBathrooms} max={4} />
        </div>
        <div style={wrapperStyle} className="maxPrice">
          <p>Max Price ($m)</p>
          <Slider min={0} defaultValue={0} marks={{ 0: 'Any', 2000000: 2 , 4000000: 4 , 6000000: 6 , 8000000: 8 , 10000000: 10 }} step={null} onChange={this.onSliderChangeMaxPrice} max={10000000} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" id="submit-searchproperties" />
        </form>



        <div>
        {
          this.state.propertySearch === 'selected'
          &&
         <SearchedShowListings
           domainToken={this.state.domainToken}
           bedrooms={this.state.bedrooms}
           bathrooms={this.state.bathrooms}
           maxPrice={this.state.max_price}
           suburb={this.state.suburb}
         />

        }
       </div>



      </div>
    )
  }
}

export default SearchProperties
