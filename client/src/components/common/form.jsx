import { Component } from "react";
import Input from "./input";
var Joi = require("joi-browser");
class Form extends Component {
  state = {
    data: {},
    // if there's error, we add property to this error object. Like username: "Username required"
    // the property in this object map to the name of the input field
    errors: {},
  };

  validate = () => {
    // 1st argument: obj we want to validate
    // 2nd argument: schema
    // 3rd argument: By default, Joi terminates validation as soon as it finds an error (abortEarly), and we want to turn this off
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null; // if there's no error

    // Otherwise, get that array and map into an obj
    const errors = {};
    // you can also use map() or reduce() instead of for loop
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    // sub error obj
    const obj = { [name]: value };
    // sub schema
    const schema = { [name]: this.schema[name] };

    // Don't pass this.state.data as your first argument, since it validates the entire form
    // In this case, we only want to validate one input field, so create an obj with only one property (sub error obj)
    // Don't pass this.schema as your 2nd argument, since it's the schema for the entire form
    // In this case, pass the sub schema
    // We want the abortEarly set to true, since with multiple validation errors, we don't want to display all of them.
    // So we don't pass the 3rd argument here
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevents the full page reload

    // this method returns an obj. If there's no error, it returns null
    const errors = this.validate();
    // we don't want to set the error property to null if there's no error
    this.setState({ errors: errors || {} });
    // if there's an error, return immediately so that we won't execute the following code in this method (call servers and stuff)
    if (errors) return;

    // do some other stuff after the form is submitted, like calling server
    this.doSubmit();
  };

  // When user types something, we need to get what the user types, and update the state
  // We can destructure the event object 'e' by picking the currentTarget, rename it to input
  // e.currentTarget returns that input field
  handleChange = ({ currentTarget: input }) => {
    // To validate input field on change
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]; // clear the error

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // the default value is text
  // type is for password field
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
