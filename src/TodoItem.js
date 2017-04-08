import React, { Component } from 'react';

const keyDown = (event) => {
  const e = event;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.target.blur();
  }
};

const dateDiff = (dueDate) => {
  const milisPerDay = 24 * 60 * 60 * 1000;
  const today = new Date(Date.now());
  const date = new Date(`${dueDate}/${today.getFullYear()}`);
  const daysLeft = Math.ceil((date.getTime() - today.getTime()) / milisPerDay);
  if (daysLeft <= 7 && daysLeft > 3) {
    return 'still-have-time';
  } else if (daysLeft <= 3 && daysLeft > 1) {
    return 'coming';
  } else if (daysLeft <= 1 && daysLeft >= 0) {
    return 'now';
  }
  return '';
};

class TodoItem extends Component {
  constructor() {
    super();
    this.contextChanged = this.contextChanged.bind(this);
  }

  contextChanged(event) {
    const slot = (event.target.classList.contains('dueDate')) ? 0 : 1;
    (() => this.props.slotChanged(
      this.props.parentId,
      this.props.id,
      slot,
      event.target.textContent))();
  }

  render() {
    const emergency = dateDiff(this.props.dueDate);
    return (
      <div className="todoItem">
        <div className="checkBox">
          <input
            type="checkbox"
            id={`item-${this.props.id}`}
            onClick={() => this.props.itemCheckBoxClicked(this.props.parentId, this.props.id)}
            checked={this.props.done}
          />
          <label htmlFor={`item-${this.props.id}`} />
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          className={`dueDate editable ${emergency} ${(this.props.done ? 'done' : '')}`}
          onKeyDown={keyDown}
          onBlur={this.contextChanged}
        >{this.props.dueDate}</div>
        <div
          contentEditable
          suppressContentEditableWarning
          className={`itemContent editable ${(this.props.done ? 'done' : '')}`}
          onKeyDown={keyDown}
          onBlur={this.contextChanged}
        >{this.props.content}
        </div>
        <div className="button">
          <button
            className="fa fa-times"
            onClick={() => this.props.removeItemButtonClicked(this.props.parentId, this.props.id)}
          />
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  itemCheckBoxClicked: React.PropTypes.func.isRequired,
  parentId: React.PropTypes.number.isRequired,
  id: React.PropTypes.number.isRequired,
  done: React.PropTypes.bool.isRequired,
  dueDate: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  removeItemButtonClicked: React.PropTypes.func.isRequired,
  slotChanged: React.PropTypes.func.isRequired,
};

export default TodoItem;
