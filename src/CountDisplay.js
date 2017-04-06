import React from 'react';

const CountDisplay = function CountDisplay(props) {
  return (
    <div className="countDisplay">
      <div className="displayItem">Done: {props.doneCount}</div>
      <div className="displayItem">Todo: {props.todoCount}</div>
    </div>
  );
};

CountDisplay.propTypes = {
  doneCount: React.PropTypes.number.isRequired,
  todoCount: React.PropTypes.number.isRequired,
};

export default CountDisplay;
