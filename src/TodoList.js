import React, { Component } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css'

class TodoList extends Component {
	
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
			/>
		)
	}

	render() {
		return (
			<div className="todoList">
				{Array.from(this.props.itemList.values()).map(this.renderItem, this)}
				<button className="addItemButton" onClick={() => this.props.addItemButtonClicked(this.props.id)}>Add Item</button>
				<button className="removeListButton" onClick={() => this.props.removeListButtonClicked(this.props.id)}>Remove this list</button>
			</div>
		);
	}
}

export default TodoList;