import React, { Component } from "react";

class AddingList extends Component {
  state = {
      name: "",
      description: "" 
  };
  
  render() {
    return (
      <div className="col-12">
        <div className="form">
          <div className="form-group form-add">
            <input
              className="form-control mx-auto"
              type="text"
              placeholder="Enter Name"
              value = {this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <input
              className="form-control mx-auto"
              type="text"
              placeholder="Enter Description"
              value = {this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
            <button
              className="btn btn-primary mx-auto"
              type="button"
              onClick={() => this.props.addBookList(this.state)}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddingList;
