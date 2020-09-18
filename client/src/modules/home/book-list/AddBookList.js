import React, { useState } from "react";

const AddBookList = ({ addBookList }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <div className="col-sm-2">
        <div
          className="btn btn-success btn-lg btnAddList"
          onClick={() => setShowAddForm((prev) => !prev)}
        >
          <span className="glyphicon glyphicon-plus" /> ADD
        </div>
      </div>
      {showAddForm && (
        <div className="col-12">
          <div className="form">
            <div className="form-group form-add">
              <input
                className="form-control mx-auto"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                className="form-control mx-auto"
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <button
                className="btn btn-primary mx-auto"
                type="button"
                onClick={() => {
                  addBookList({ name, description, booksAdded: [] });
                  setShowAddForm(false);
                }}
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBookList;
