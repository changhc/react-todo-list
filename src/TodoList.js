import React, { Component } from 'react';
import TodoItem from './TodoItem';

const keyDown = (event) => {
  const e = event;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.target.blur();
  }
};

class TodoList extends Component {
  constructor() {
    super();
    this.titleChanged = this.titleChanged.bind(this);
  }

  titleChanged(event) {
    (() => this.props.slotChanged(
      this.props.id,
      -1,
      -1,
      event.target.textContent))();
  }

  renderItem(item) {
    return (
      <TodoItem
        key={item.key}
        id={item.key}
        parentId={this.props.id}
        content={item.content}
        dueDate={item.dueDate}
        done={item.done}
        removeItemButtonClicked={this.props.removeItemButtonClicked}
        itemCheckBoxClicked={this.props.itemCheckBoxClicked}
        slotChanged={this.props.slotChanged}
      />
    );
  }

  render() {
    return (
      <div className="todoList">
        <div>
          <div className="title-block">
            <div
              contentEditable
              suppressContentEditableWarning
              className="title editable"
              onKeyDown={keyDown}
              onBlur={this.titleChanged}
            >{this.props.title}</div>
            <div className="button">
              <div className="buttons">
                <button
                  title="New Item"
                  className="fa fa-plus"
                  onClick={() => this.props.addItemButtonClicked(this.props.id)}
                />
                <button
                  title="Remove this list"
                  className="fa fa-times"
                  onClick={() => this.props.removeListButtonClicked(this.props.id)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="todoItemList">
          <div>
            {Array.from(this.props.itemList.values()).map(this.renderItem, this)}
          </div>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  removeItemButtonClicked: React.PropTypes.func.isRequired,
  itemCheckBoxClicked: React.PropTypes.func.isRequired,
  itemList: React.PropTypes.instanceOf(Map).isRequired,
  addItemButtonClicked: React.PropTypes.func.isRequired,
  removeListButtonClicked: React.PropTypes.func.isRequired,
  slotChanged: React.PropTypes.func.isRequired,
};

export default TodoList;
