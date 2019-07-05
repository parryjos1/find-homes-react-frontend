import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAccount extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      email: '',
      password: '',
      errorMessage: ''
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
    axios.post('http://localhost:3000/user', { name: this.state.name, email: this.state.email, password: this.state.password
    }).then( res => {
      console.log(res)
    }).catch( err => {
      console.log(err);
    })


  }




  render(){
    return(
      <div>
        <h1>Create a new account</h1>
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
