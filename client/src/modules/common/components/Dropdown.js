import React from "react";

export const Dropdown = props => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.buttonText}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.listItems.map(element => {
          return (
            <button
              key={element.name}
              className="dropdown-item"
              type="button"
              onClick={() => props.onItemClicked(element)}
            >
              {element.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
