import React, { Component } from "react";

class EditBookList extends Component {
  constructor(props) {
    super(props);
    const { id, name, description, booksAdded } = this.props.bookList;
    this.state = { id, name, description, booksAdded };
  }

  render() {
    return (
      <div className="col-12">
        <div className="form">
          <div className="form-group form-add">
            <h3 className="mb-5">Edit your list information</h3>
            <input
              className="form-control mx-auto"
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <input
              className="form-control mx-auto"
              type="text"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
            <button
              className="btn btn-primary mx-auto"
              type="button"
              onClick={() => this.props.editBookList(this.state)}
            >
              EDIT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditBookList;
