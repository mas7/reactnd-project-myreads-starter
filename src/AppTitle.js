import React from "react";
import PropTypes from "prop-types";

function AppTitle(props) {
  return (
    <div className="list-books-title">
      <h1>{props.title ? props.title : "My Reads"}</h1>
    </div>
  );
}

AppTitle.propTypes = { title: PropTypes.string };

export default AppTitle;
