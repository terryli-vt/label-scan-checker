import React, { Component } from "react";
class Counter extends Component {
  render() {
    const { onIncrement, onDecrement, counter } = this.props;

    return (
      <h1 style={{ whiteSpace: "nowrap" }}>
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-secondary btn-lg m-2"
          style={
            counter.hideButtons ? { display: "none" } : { display: "inline" }
          }
        >
          +
        </button>
        <span className={this.getBadgeClasses()}> {counter.value} </span>
        <button
          onClick={() => onDecrement(counter)}
          className="btn btn-secondary btn-lg m-2"
          disabled={counter.value === 0 ? "disabled" : ""}
          style={
            counter.hideButtons ? { display: "none" } : { display: "inline" }
          }
        >
          -
        </button>
      </h1>
    );
  }
  getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}
export default Counter;
