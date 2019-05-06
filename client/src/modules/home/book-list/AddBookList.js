import React, { Component } from "react";

class AddBookList extends Component {
  state = {
    name: "",
    description: "",
    showAddForm: false
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-sm-2">
          <div
            className="btn btn-success btn-lg btnAddList"
            onClick={() => {
              this.state.showAddForm
                ? this.setState({ showAddForm: false })
                : this.setState({ showAddForm: true });
            }}
          >
            <span className="glyphicon glyphicon-plus" /> ADD
          </div>
        </div>
        {this.state.showAddForm && (
          <div className="col-12">
            <div className="form">
              <div className="form-group form-add">
                <input
                  className="form-control mx-auto"
                  type="text"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
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
                  onClick={() => {
                    this.props.addBookList({ ...this.state, booksAdded: [] });
                    this.setState({ showAddForm: false });
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AddBookList;
