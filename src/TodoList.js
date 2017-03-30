import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'

class TodoList extends Component {
	
	renderItem(item) {
		return (
			<TodoItem
				parentId={this.props.key}
				content={item.content}
				dueDate={item.dueDate}
				removeItemButtonClicked={this.props.removeItemButtonClicked}
				itemCheckBoxClicked={this.props.itemCheckBoxClicked}
			/>
		)
	}

	render() {
		return (
			<div className="todoList">
				{this.props.itemList.map(this.renderItem, this)}
				<button className="addItemButton" onClick={() => this.props.addItemButtonClicked(this.props.id)}>Add Item</button>
				<button className="removeListButton" onClick={this.props.removeListButtonClicked}>Remove this list</button>
			</div>
		);
	}
}

export default TodoList;