import React from "react";
import Form from "./common/form";
var Joi = require("joi-browser");

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    /* this includes all errors in this form */
    /* initially, it's an empty obj, and if there's error in the future, we add properties to this obj */
    errors: {},
  };

  schema = {
    // setting the label is useful for displaying user-friendly error message
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  // determine what should happen when the form is submitted
  doSubmit = () => {
    // call the server, save the changes, and redirect the user to another page
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login", "primary")}
          </form>
        </div>
      </div>
    );
  }
}
export default LoginForm;
