import React, { Component } from 'react';
import TodoList from './TodoList';
import CountDisplay from './CountDisplay';
import './TodoApp.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: new Map(),
      doneCount: 0,
      todoCount: 0,
      listKeyCount: 0,
      itemKeyCount: -1,
    };
    this.createNewList = this.createNewList.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.checkBoxClicked = this.checkBoxClicked.bind(this);
    this.removeList = this.removeList.bind(this);
    this.slotChanged = this.slotChanged.bind(this);
  }

  createNewList() {
    const todoListT = this.state.todoList;
    let count = this.state.listKeyCount;
    todoListT.set(count, {
      key: this.state.listKeyCount,
      title: 'New Todo List',
      todoItem: new Map(),
    });
    count += 1;
    this.setState({ todoList: todoListT, listKeyCount: count });
  }

  addItem(listId) {
    const todoListT = this.state.todoList;
    let count = this.state.itemKeyCount;
    let todoCountT = this.state.todoCount;
    count += 1;
    todoCountT += 1;
    const date = new Date(Date.now());
    todoListT.get(listId).todoItem.set(count, {
      key: count,
      id: count,
      dueDate: `${date.getMonth()}/${date.getDay()}`,
      content: 'New Item',
      done: false,
    });
    this.setState({ itemKeyCount: count, todoList: todoListT, todoCount: todoCountT });
  }

  removeItem(listId, itemId) {
    const todoListT = this.state.todoList;
    let doneCountT = this.state.doneCount;
    let todoCountT = this.state.todoCount;
    const status = todoListT.get(listId).todoItem.get(itemId).done;
    doneCountT -= (status) ? 1 : 0;
    todoCountT -= (status) ? 0 : 1;
    todoListT.get(listId).todoItem.delete(itemId);
    this.setState({ todoList: todoListT, doneCount: doneCountT, todoCount: todoCountT });
  }

  checkBoxClicked(listId, itemId) {
    const todoListT = this.state.todoList;
    let todoCountT = this.state.todoCount;
    let doneCountT = this.state.doneCount;
    const item = todoListT.get(listId).todoItem.get(itemId);
    item.done = !item.done;
    todoListT.get(listId).todoItem.set(itemId, item);
    todoCountT += (item.done) ? -1 : 1;
    doneCountT += (item.done) ? 1 : -1;
    this.setState({ todoList: todoListT, todoCount: todoCountT, doneCount: doneCountT });
  }

  removeList(listId) {
    const todoListT = this.state.todoList;
    let doneCountT = this.state.doneCount;
    let todoCountT = this.state.todoCount;
    todoListT.get(listId).todoItem.forEach((item) => {
      doneCountT -= (item.done) ? 1 : 0;
      todoCountT -= (item.done) ? 0 : 1;
    });
    todoListT.delete(listId);
    this.setState({ todoList: todoListT, doneCount: doneCountT, todoCount: todoCountT });
  }

  slotChanged(listId, itemId, slot, context) {
    const todoListT = this.state.todoList;
    if (itemId !== -1) {
      const item = todoListT.get(listId).todoItem.get(itemId);
      if (slot === 0) {         // dueDate
        item.dueDate = context;
      } else if (slot === 1) {  // itemContent
        item.content = context;
      }
    } else {    // list title
      const list = todoListT.get(listId);
      list.title = context;
    }
    this.setState({ todoList: todoListT });
  }

  renderTodoList(list) {
    return (
      <TodoList
        key={list.key}
        id={list.key}
        title={list.title}
        itemList={list.todoItem}
        addItemButtonClicked={this.addItem}
        removeItemButtonClicked={this.removeItem}
        itemCheckBoxClicked={this.checkBoxClicked}
        removeListButtonClicked={this.removeList}
        slotChanged={this.slotChanged}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="head">
          <div>
            <div className="title-block">
              <div className="title">
                <h1>TODOs</h1>
              </div>
              <div className="button">
                <button
                  className="fa fa-plus fa-2x"
                  id="createListButton"
                  onClick={this.createNewList}
                />
              </div>
            </div>
          </div>
          <div />
          <div>
            <CountDisplay doneCount={this.state.doneCount} todoCount={this.state.todoCount} />
          </div>
        </div>
        <div className="todoLists">
          {Array.from(this.state.todoList.values()).map(this.renderTodoList, this)}
        </div>
      </div>
    );
  }
}

export default TodoApp;
