import React, {Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

let email = '';
let password = '';
let jwt = '';

class LogIn extends Component {
  constructor(){
    super();
    this.state ={
      errorMessage: ''
    }
  } // end of constructor

  handleInputEmail = (event) =>{
  event.persist();
  // console.log(event.target.value);
  email = event.target.value;
  }

  handleInputPassword = (event) =>{
  event.persist();
  // console.log(event.target.value);
  password = event.target.value;
  }

  handleSubmit = (event) => {
    // prevents page reload
  event.preventDefault();
  // console.log(this.state.email);
  // console.log(this.state.password);
  console.log(email);
  console.log(password);

  //make a post request to the backend, if user exists and password is correct (this is managed by knock gem)
  //then send back JWT



  axios.post('https://find-homes.herokuapp.com/user_token', {"auth": {"email": email, "password": password}})
  .then( res => {

    jwt = res.data.jwt;
    console.log(jwt)

    //store UserToken in localStorage
    // which allows for stored data is saved across browser sessions.
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    //In console: localStorage.getItem('userToken')
    localStorage.setItem('userToken', jwt);
    //redirect to wishlist
    this.props.history.push('/wishlist');


  })
  .catch( err => {
    this.setState({ errorMessage: 'Invalid email or password'})
  } )

} //end of handleSubmit

  render(){
    return(
      <div className="log-in-background">
        <div className="log-in">
          <div style={{color: 'red'}}>
            {this.state.errorMessage}
          </div>
          <form onSubmit={ this.handleSubmit }>
            <br/>
            <input className="log-in-form" type="text" placeholder="Your email" onChange={ this.handleInputEmail }></input>
            <br/>
            <br/>
            <input className="log-in-form" type="text" placeholder="Password" type="password" onChange={ this.handleInputPassword }></input>
            <br/>
            <br/>
            <input className="log-in-submit" type="submit" value="LOG IN"></input>
          </form>
        </div>

      </div>
    )
  }

}

export default LogIn;
