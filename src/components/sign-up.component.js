import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../signup.css'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          email: ''
        }

        this.state = {
            password: ''
        }
    }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
      }

      onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          email: this.state.email,
          password: this.state.password
        }
    
        console.log(user, "jhivjuvk");
    
        axios.post('http://localhost:5000/users/add', user)
          .then(res => console.log(res.data));
          console.log( "here");
        this.setState({
          email: ''
        })

        this.setState({
            password: ''
          })
          window.location = '/order';
      }

  render() {
    return (
      <div>
        <div id="screen">
          <div id="signscrn">
            Sign Up To Order 
          </div>
        </div>
       {/* Form */}
       <div id="form">
        <form onSubmit={this.onSubmit}>
           {/* Email */}
          <div id="form-group-1"> 
            <label id="one">Email: </label>
            <br/>
            <input  type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <br></br>
            {/* Password */}
            <div id="form-group-2"> 
            <label id="two">Password: </label>
            <br/>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          {/* Submit */}
          <div id="form-group-3">
            <input type="submit" value="Sign In" className="btn btn-primary" />
          </div>
        </form>
        </div>
      </div>
    );
  }
}