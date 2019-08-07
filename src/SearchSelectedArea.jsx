import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import DisplayProperties from './DisplayProperties'

class SearchSelectedArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      domain_token: ''
    }
  }

  componentDidMount() {

    this.getDomainToken();

    // const domain_token = this.getDomainToken()
    // console.log(`domain_token is: ${domain_token}`);
    //
    // this.setState({domain_token})

  }

  getDomainToken = () => {
     const railsDomainTokenRequest = axios.get("https://find-homes.herokuapp.com/domain_token").then(result => {
       console.log(`The result is: ${result}`);
       this.setState({domain_token: result.data})
     })

     console.log(`railsDomainTokenRequest is: ${railsDomainTokenRequest}`);

     return railsDomainTokenRequest
  }

  handleClick = () => {
    this.props.history.push("/displayproperties");
  }


  render(){

    return(
      <div className="component">


        {/* */}
        <button>
        <Link to="/displayproperties" >Click to displayproperties</Link>
        </button>
        {/*
        // <button component={Link} to="/displayproperties">
        //   Search Selected Area
        // </button>
        //
        // <button onClick={this.handleClick} type="button"></button>
      */}

      </div>
    )
  }
}

export default SearchSelectedArea
