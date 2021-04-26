import React from "react";
import PropTypes from "prop-types";

export function Todolist(todos) {
  return <div>{JSON.stringify(todos)}</div>;
}

Todolist.propTypes = {};
