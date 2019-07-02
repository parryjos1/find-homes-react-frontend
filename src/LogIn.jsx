import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

let email = '';
let password = '';
let jwt = '';

class LogIn extends Component {
  constructor(){
    super();
    this.state ={
      userToken: '',
      errorMessage: ''
    }
  } // end of constructor

  handleInputEmail = (event) =>{
  event.persist();
  // console.log(event.target.value);
  // this.setState({ email: event.target.value})
  email = event.target.value;
  }

  handleInputPassword = (event) =>{
  event.persist();
  // console.log(event.target.value);
  // this.setState({ password: event.target.value });
  password = event.target.value;
  }

  handleSubmit = (event) => {
    // prevents page reload
  event.preventDefault();
  // console.log(this.state.email);
  // console.log(this.state.password);
  console.log(email);
  console.log(password);

  //make a post request to the backend, if user exists and password is correct
  //then send back JWT
  // axios.post('http://localhost:3000/user_token', {"auth": {"email": this.state.email, "password": this.state.password}})
  axios.post('http://localhost:3000/user_token', {"auth": {"email": email, "password": password}})
  .then( res => {

    jwt = res.data.jwt;
    console.log('jwt', jwt);
    this.setState({ userToken: jwt });

    //How to do an error message


  })
  .catch( console.warn )

} //end of handleSubmit

  render(){
    return(
      <div>
        <h1>Log in</h1>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Your email" onChange={ this.handleInputEmail }></input>
          <br/>
          <input type="text" placeholder="Password" type="password" onChange={ this.handleInputPassword }></input>
          <br/>
          <input type="submit" value="Log In"></input>
        </form>

      </div>
    )
  }

}

export default LogIn;
