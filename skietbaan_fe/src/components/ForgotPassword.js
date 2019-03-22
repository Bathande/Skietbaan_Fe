import React, { Component } from 'react';
import '../components/ForgotPassword.css';
import { BASE_URL } from "../actions/types";
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: "",
            isSent:"",
        }
        this.sendEmail = this.sendEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    sendEmail() {

            fetch(BASE_URL + "/api/Features/forgotPassword?user=" + this.state.emailValue,{
                method: "post",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.emailValue)
              })
              .then(res=>res.json())
              .then(data=>this.setState({isSent:data}))

              
    }

    handleChange(event) {   

        this.setState({ emailValue: event.target.value });
    }   

    render() {
        return (
            <div className="forgot-password-page-content">
                   
                <div className="container-of-elements">
                <div className="docuements-heading">
                        <div className="documents-text">Documents</div>
                    </div>
                    <label className="forgot-password-label">Enter Email</label>
                    <br/>
                    <label className="password-reset-label">Enter Password</label>
                    <input
                        type="text"
                        name="emailValue"
                        id="email"
                        autoComplete = "off"
                        value={this.state.emailValue} 
                        onChange={this.handleChange}
                        className="forgot-password-email"
                    />
                    <button className="button-email" onClick={this.sendEmail}>Send Email</button>
                    <br/>
                    <label className="forgot-password-label">{this.state.isSent == "user not registered"? "user not registered":null}</label>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;
