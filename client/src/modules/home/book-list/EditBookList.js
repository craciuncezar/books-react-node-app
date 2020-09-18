import React, { useState } from "react";

export const EditBookList = (props) => {
  const [name, setName] = useState(props.bookList.name);
  const [description, setDescription] = useState(props.bookList.description);

  return (
    <div className="col-12">
      <div className="form">
        <div className="form-group form-add">
          <h3 className="mb-5">Edit your list information</h3>
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
            onClick={() =>
              props.editBookList({
                ...props.bookList,
                name,
                description,
              })
            }
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
};
