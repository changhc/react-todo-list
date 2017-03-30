import React, { Component } from 'react';
import TodoList from './TodoList';

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todoList: [],
			doneCount: 0,
			finishedCount: 0,
			listKeyCount: 0,
			itemKeyCount: -1,
		};
		this.createNewList = this.createNewList.bind(this);
		// this.renderTodoList = this.renderTodoList.bind(this);
	}

	createNewList() {
		let todoList_ = this.state.todoList;
		let count = this.state.listKeyCount;
		todoList_.push({
			key: this.state.listKeyCount,
			title: 'New Todo List',
			todoItem: [],
		});
		count++;
		this.setState({todoList: todoList_, listKeyCount: count});
		
	}

	addItem(listId) {
		let todoList_ = this.state.todoList;
		// todoList_.todoItem
	}

	renderTodoList(list) {
		return (
			<TodoList
				key={list.key}
				id={list.key}
				title={list.title}
				itemList={list.todoItem}
				addItemButtonClicked={this.addItem.bind(this)}
				//removeItemButtonClicked={this.removeItem.bind(this)}
				//itemCheckBoxClicked={this.checkBoxClicked.bind(this)}
				//removeListButtonClicked={this.removeList.bind(this)}
			/>
		);
	}

	render() {
		return (
			<div>
				<button id="createListButton" onClick={this.createNewList}>Create a new list</button>
				{this.state.todoList.map(this.renderTodoList, this)}
			</div>
		);
	}
}

export default TodoApp;