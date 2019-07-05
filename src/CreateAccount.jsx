import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

let jwt = '';

class CreateAccount extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      email: '',
      password: '',
      errorMessage: [],
    }
  } // end of constructor


  handleInputName = (event) => {
    event.persist();
    this.setState({ name: event.target.value});
  }


  handleInputEmail = (event) => {
    event.persist();
    // console.log(event.target.value);
    this.setState({ email: event.target.value});
  }


  handleInputPassword = (event) => {
    event.persist();
    // console.log(event.target.value);
    this.setState({ password: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.name);
    // console.log(this.state.email);
    // console.log(this.state.password);
    this.createUser();

  } // end of handleSubmit

  createUser = () => {
    axios.post('http://localhost:3000/user', { user: {name: this.state.name, email: this.state.email, password: this.state.password}
    }).then( res => {
      console.log(res);

      this.getToken();


    }).catch( err => {
      console.log(err);
      console.log(err.response.data.errors);
      this.setState({
        errorMessage: err.response.data.errors
      })
    })
  }

  getToken = () => {
    axios.post('http://localhost:3000/user_token', {"auth": {"email": this.state.email, "password": this.state.password}})
    .then( res => {

    jwt = res.data.jwt;
    console.log(jwt)

    localStorage.setItem('userToken', jwt);
    this.props.history.push('/wishlist');
    })
    .catch(err =>{
      console.log(err);
    })
  }



  render(){
    return(
      <div className="component">
        <h1>Create a new account</h1>
        <div style={{color: 'red'}}>
          <ul>
          {
              this.state.errorMessage.map( error => (
              <li>{error}</li>
              ))
          }

          </ul>

        </div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Your name" onChange={ this.handleInputName }></input><br/>
          <input type="text" placeholder="Email" onChange={ this.handleInputEmail }></input><br/>
          <input type="password" placeholder="Password" onChange={ this.handleInputPassword }></input><br/>
          <input type="submit" value="Create new account"></input>
        </form>

      </div>
    )
  }

} // end of CreateAccount


export default CreateAccount;
