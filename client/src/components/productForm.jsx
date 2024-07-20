import React from "react";
import Form from "./common/form";
import { Link } from "react-router-dom";
var Joi = require("joi-browser");

class ProductForm extends Form {
  state = {
    data: {
      name: "",
      partNumber: "",
      customer: "",
    },
    /* this includes all errors in this form */
    /* initially, it's an empty obj, and if there's error in the future, we add properties to this obj */
    errors: {},
  };

  schema = {
    // setting the label is useful for displaying user-friendly error message
    name: Joi.string().required().label("Part Name"),
    partNumber: Joi.string().required().label("Part Number"),
    customer: Joi.string().required().label("Customer"),
  };

  // determine what should happen when the form is submitted
  async doSubmit() {
    // call the server, save the changes, and redirect the user to another page
    try {
      // let { data } = this.state;
      // await postProduct(data);
      // const response = await postProduct(data);
      // console.log("Product form submitted!");
      // console.log("Data returned from post:", response);
      window.location = "/products";
    } catch (ex) {
      console.error("Error adding product:", ex);
    }
  }

  render() {
    return (
      <div className="center-page-container">
        <div className="half-screen">
          <h1>Add Product</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Part Name")}
            {this.renderInput("partNumber", "Part Number")}
            {this.renderInput("customer", "Customer")}
            <Link className="btn btn-link m-2" to="/products">
              Cancel
            </Link>
            {this.renderButton("Add", "primary")}
          </form>
        </div>
      </div>
    );
  }
}
export default ProductForm;
