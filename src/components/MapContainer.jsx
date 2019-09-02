import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import GoogleMapReact from 'google-map-react';
import SearchSelectedArea from './SearchSelectedArea'
import DisplayProperties from './DisplayProperties'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const wrapperStyle = { width: "80vw", 'margin-top': "25px", 'margin-left': "10px", 'margin-bottom': "25px"};


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const testMarkerArray = []

require('dotenv').config();

// const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY2;
// Google API Key is scoped to only this site
// const API_KEY = 'AIzaSyApveGzuUmoZ9NVuRnQMKCWvI_GXOqlzW4';
const API_KEY2 = 'AIzaSyApveGzuUmoZ9NVuRnQMKCWvI_GXOqlzW4';
// console.log('API KEY', API_KEY, process.env);

/* Stack-based Douglas Peucker line simplification routine
   returned is a reduced GLatLng array
   After code by  Dr. Gary J. Robinson,
   Environmental Systems Science Centre,
   University of Reading, Reading, UK

   http://www.bdcc.co.uk/Gmaps/GDouglasPeuker.js
*/

// Douglas–Peucker algorithm (https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
// used to return an array of the polygon points based on lines drawn
function GDouglasPeucker (source, kink)
/* source[] Input coordinates in GLatLngs 	*/
/* kink	in metres, kinks above this depth kept  */
/* kink depth is the height of the triangle abc where a-b and b-c are two consecutive line segments */
{
    var	n_source, n_stack, n_dest, start, end, i, sig;
    var dev_sqr, max_dev_sqr, band_sqr;
    var x12, y12, d12, x13, y13, d13, x23, y23, d23;
    var F = ((Math.PI / 180.0) * 0.5 );
    var index = new Array(); /* aray of indexes of source points to include in the reduced line */
	var sig_start = new Array(); /* indices of start & end of working section */
    var sig_end = new Array();

    /* check for simple cases */

    if ( source.length < 3 )
        return(source);    /* one or two points */

    /* more complex case. initialize stack */

	n_source = source.length;
    band_sqr = kink * 360.0 / (2.0 * Math.PI * 6378137.0);	/* Now in degrees */
    band_sqr *= band_sqr;
    n_dest = 0;
    sig_start[0] = 0;
    sig_end[0] = n_source-1;
    n_stack = 1;

    /* while the stack is not empty  ... */
    while ( n_stack > 0 ){

        /* ... pop the top-most entries off the stacks */

        start = sig_start[n_stack-1];
        end = sig_end[n_stack-1];
        n_stack--;

        if ( (end - start) > 1 ){  /* any intermediate points ? */

                /* ... yes, so find most deviant intermediate point to
                       either side of line joining start & end points */

            x12 = (source[end].lng() - source[start].lng());
            y12 = (source[end].lat() - source[start].lat());
            if (Math.abs(x12) > 180.0)
                x12 = 360.0 - Math.abs(x12);
            x12 *= Math.cos(F * (source[end].lat() + source[start].lat()));/* use avg lat to reduce lng */
            d12 = (x12*x12) + (y12*y12);

            for ( i = start + 1, sig = start, max_dev_sqr = -1.0; i < end; i++ ){

                x13 = (source[i].lng() - source[start].lng());
                y13 = (source[i].lat() - source[start].lat());
                if (Math.abs(x13) > 180.0)
                    x13 = 360.0 - Math.abs(x13);
                x13 *= Math.cos (F * (source[i].lat() + source[start].lat()));
                d13 = (x13*x13) + (y13*y13);

                x23 = (source[i].lng() - source[end].lng());
                y23 = (source[i].lat() - source[end].lat());
                if (Math.abs(x23) > 180.0)
                    x23 = 360.0 - Math.abs(x23);
                x23 *= Math.cos(F * (source[i].lat() + source[end].lat()));
                d23 = (x23*x23) + (y23*y23);

                if ( d13 >= ( d12 + d23 ) )
                    dev_sqr = d23;
                else if ( d23 >= ( d12 + d13 ) )
                    dev_sqr = d13;
                else
                    dev_sqr = (x13 * y12 - y13 * x12) * (x13 * y12 - y13 * x12) / d12;// solve triangle

                if ( dev_sqr > max_dev_sqr  ){
                    sig = i;
                    max_dev_sqr = dev_sqr;
                }
            }

            if ( max_dev_sqr < band_sqr ){   /* is there a sig. intermediate point ? */
                /* ... no, so transfer current start point */
                index[n_dest] = start;
                n_dest++;
            }
            else{
                /* ... yes, so push two sub-sections on stack for further processing */
                n_stack++;
                sig_start[n_stack-1] = sig;
                sig_end[n_stack-1] = end;
                n_stack++;
                sig_start[n_stack-1] = start;
                sig_end[n_stack-1] = sig;
            }
        }
        else{
                /* ... no intermediate points, so transfer current start point */
                index[n_dest] = start;
                n_dest++;
        }
    }

    /* transfer last point */
    index[n_dest] = n_source-1;
    n_dest++;

    /* make return array */
    var r = new Array();
    for(var i=0; i < n_dest; i++)
        r.push(source[index[i]]);
    return r;

}


export default class MapContainer extends Component {

  constructor(props){
    super(props);

    // map & maps are from GoogleReactComponent - wrapper for map
    this.state = {
      map: null,
      maps: null,
      searchAreaPath: [],
      domain_token: '',
      selectedPropertyLocations: [],
      bedrooms: 0,
      bathrooms: 0,
      max_price: 100000000,
      suburb: '',
    };

  }

  // Sydney City Lat & Lng for default
  static defaultProps = {
    center: {
      lat: -33.8708,
      lng: 151.2073
    },
    zoom: 15
  };

  // handleChange refactored when not using imported component
  handleChange(e) {
     this.setState({ [e.target.name] : e.target.value });
  }

  // Slider Handlers
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

  componentDidMount() {

    // get's domain token from rails database
    this.getDomainToken();

  }

  // gets domain token by making an axios request to the rails server which runs the logic to       generate a token
  // the results of axios query is then saved to state
  getDomainToken = () => {
     const railsDomainTokenRequest = axios.get("https://find-homes.herokuapp.com/domain_token").then(result => {
       console.log(`The result is: ${result}`);
       this.setState({domain_token: result.data})
       localStorage.setItem('domainToken', result.data.data)
     })
     console.log(`railsDomainTokenRequest is: ${railsDomainTokenRequest}`);
     return railsDomainTokenRequest
  }

  // ?*? what is this function do what is map and what is maps?
  handleApiLoaded = ({map, maps}) => {
    console.log('LOADED', map, maps);
    // debugger;
    this.setState({
      map: map,
      maps: maps
    });
  }

  freeDrawMouseDown = () => {

    //the polygon
    let poly = new this.state.maps.Polyline({map:this.state.map,clickable:false});

    //move-listener
    let move=this.state.maps.event.addListener(this.state.map,'mousemove',function(e){
        poly.getPath().push(e.latLng);
    });


    const that = this;

    //mouseup-listener
    this.state.maps.event.addListenerOnce(this.state.map,'mouseup',function(e){

        that.state.maps.event.removeListener(move);
        var path=poly.getPath(); // what is this? and how does it know where the path has moved
        poly.setMap(null);

        //?*?
        // Gets the path of the mouse movements but why is that on the mouse up?
        var theArrayofLatLng = path.g; // What is path.j? ?*?
        var arrayforPolygontoUse= GDouglasPeucker(theArrayofLatLng,50);
        console.log("ArrayforPolygontoUse", arrayforPolygontoUse);

        // By this point, you will have the array of lat/lng coordinates, which you can
        // save into state:
        const searchPath = arrayforPolygontoUse.map( pos => ({ lat: pos.lat(), lon: pos.lng() }) );
        // const searchPath = arrayforPolygontoUse.map( pos => [ pos.lat(), pos.lng() ] );

        that.setState({
          searchAreaPath:  searchPath
        });

        console.log('path', searchPath);


        var polyOptions = {
            map: that.state.map,
            fillColor: '#458AD3',
            fillOpacity: 0.7,
            strokeColor: '#FF3B00',
            strokeWeight: 2,
            clickable: false,
            zIndex: 1,
            path: arrayforPolygontoUse,
            editable: false
        }

        poly=new that.state.maps.Polygon(polyOptions);

        that.state.maps.event.clearListeners(that.state.map.getDiv(), 'mousedown');

        that.state.map.setOptions({
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: true
        });

    });  // mouseup-handler

  } //freeDrawMouseDown()

  freeDraw = (event) => {
    // ?*? what is map.setOptions?
    this.state.map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false
    });


    this.state.maps.event.addDomListener(this.state.map.getDiv(), 'mousedown', this.freeDrawMouseDown);

  } //freeDraw()

  selectedPropCallBack = (e) => {
    console.log(`~~~~e is: ${e}`);
    this.setState({selectedPropertyLocations: e})
  }

  // Upon submitting suburb form route to SearchedShowListing Route and pass along these state. Can be found under: history > location > staten >
  searchBySuburb = (e) => {
    e.preventDefault()

    this.props.history.push({
      // pathname: '/searchlistings',
      pathname: '/searchproperties',
      state: {
        // bedrooms: this.state.bedrooms,
        // bathrooms: this.state.bathrooms,
        // max_price: this.state.max_price,
        // suburb: this.state.suburb,
        domainToken: this.state.domain_token.data
      }
    })
  } //searchBySuburb()


  render(){


    return (
      <div className="mapContainer">
      <div style={{ height: '80vh', width: '84vw', margin: 'auto' }}>



        <div>
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
        </div>


        <div className="map-container-button">

          <button id="search-with-map" onClick={this.freeDraw}>SEARCH WITH MAP</button>
          <button onClick={this.searchBySuburb}>SEARCH BY SUBURB</button>

        </div>



        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY2 }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
           onGoogleApiLoaded={this.handleApiLoaded}
        >


      {
        this.state.selectedPropertyLocations.length > 0
        &&
         this.state.selectedPropertyLocations.map(p =>

        <AnyReactComponent
          lat={p.propertyDetails.latitude}
          lng={p.propertyDetails.longitude}
          text= <Link to={`/listing/${p.id}`}><img src={process.env.PUBLIC_URL + '/images/gmaps-marker-3.png'}></img></Link>
        />


      )
    }


      </GoogleMapReact>
      </div>
      <br />
      <div>
      {
        this.state.searchAreaPath.length > 0
        ?
        <div className="homepage-house-display">
       <DisplayProperties polygonDrawn={this.state.searchAreaPath} domainToken={this.state.domain_token} selectedPropCallBack={this.selectedPropCallBack} bedrooms={this.state.bedrooms} bathrooms={this.state.bathrooms} maxPrice={this.state.max_price}/>
       </div>
       :
       <div id="select-area-on-map">Select SEARCH WITH MAP button and draw a circle on map</div>
      }
     </div>
     </div>
   );
 }
} // End of MapContainer


// ``````~~~~~~ How MapContainer works  ~~~~~~~~~```````
/*

1. A Map is rendered on the Page from the Google Map Component
    - GoogleMapReact is a google map library google-map-react (https://github.com/google-map-react/google-map-react)
    - it allows you to render any google react component on the google map
    - ?*? what does the handleApiLoaded function do?

2. FreeDraw function allows you to draw on the Google map
    -   FreeDraw() is called on the OnClick function of the button
    -
3.




*/
