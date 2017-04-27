import React from 'react';

const CountDisplay = function CountDisplay(props) {
  return (
    <div className="countDisplay">
      <div className="displayItem">Finished&#9;: {props.doneCount}</div>
      <div className="displayItem">Ongoing&#9;: {props.todoCount}</div>
    </div>
  );
};

CountDisplay.propTypes = {
  doneCount: React.PropTypes.number.isRequired,
  todoCount: React.PropTypes.number.isRequired,
};

export default CountDisplay;
