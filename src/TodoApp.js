import React, { Component } from 'react';
import TodoList from './TodoList';
import CountDisplay from './CountDisplay';

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
		// this.renderTodoList = this.renderTodoList.bind(this);
	}

	createNewList() {
		let todoList_ = this.state.todoList;
		let count = this.state.listKeyCount;
		todoList_.set(count, {
			key: this.state.listKeyCount,
			title: 'New Todo List',
			todoItem: new Map(),
		});
		count++;
		this.setState({todoList: todoList_, listKeyCount: count});
	}

	addItem(listId) {
		let todoList_ = this.state.todoList;
		let count = this.state.itemKeyCount, todoCount_ = this.state.todoCount;
		++count;
		++todoCount_;
		const date = new Date(Date.now());
		todoList_.get(listId).todoItem.set(count, {
			key: count,
			id: count,
			dueDate: `${date.getMonth()}/${date.getDay()}`,
			content: 'New Item',
			done: false,
		});
		this.setState({ itemKeyCount: count, todoList: todoList_, todoCount: todoCount_});
	}

	removeItem(listId, itemId) {
		let todoList_ = this.state.todoList, doneCount_ = this.state.doneCount, todoCount_ = this.state.todoCount;
		let status = todoList_.get(listId).todoItem.get(itemId).done;
		doneCount_ -= (status) ? 1 : 0;
		todoCount_ -= (status) ? 0 : 1;
		todoList_.get(listId).todoItem.delete(itemId);
		this.setState({todoList: todoList_, doneCount: doneCount_, todoCount: todoCount_});
	}

	checkBoxClicked(listId, itemId) {
		let todoList_ = this.state.todoList, todoCount_ = this.state.todoCount, doneCount_ = this.state.doneCount;
		let item = todoList_.get(listId).todoItem.get(itemId);
		item.done = !item.done;
		todoList_.get(listId).todoItem.set(itemId, item);
		todoCount_ += (item.done) ? -1 : 1;
		doneCount_ += (item.done) ? 1 : -1;
		this.setState({todoList: todoList_, todoCount: todoCount_, doneCount: doneCount_});
	}

	removeList(listId) {
		let todoList_ = this.state.todoList;
		let doneCount_ = this.state.doneCount, todoCount_ = this.state.todoCount;
		todoList_.get(listId).todoItem.forEach((item) => {
			doneCount_ -= (item.done) ? 1 : 0;
			todoCount_ -= (item.done) ? 0 : 1;
		});
		todoList_.delete(listId);
		this.setState({todoList: todoList_, doneCount: doneCount_, todoCount: todoCount_});
	}

	slotChanged(listId, itemId, slot, content) {

	}

	renderTodoList(list) {
		return (
			<TodoList
				key={list.key}
				id={list.key}
				title={list.title}
				itemList={list.todoItem}
				addItemButtonClicked={this.addItem.bind(this)}
				removeItemButtonClicked={this.removeItem.bind(this)}
				itemCheckBoxClicked={this.checkBoxClicked.bind(this)}
				removeListButtonClicked={this.removeList.bind(this)}
			/>
		);
	}

	render() {
		return (
			<div>
				<CountDisplay doneCount={this.state.doneCount} todoCount={this.state.todoCount} />
				<button id="createListButton" onClick={this.createNewList}>Create a new list</button>
				{Array.from(this.state.todoList.values()).map(this.renderTodoList, this)}
			</div>
		);
	}
}

export default TodoApp;