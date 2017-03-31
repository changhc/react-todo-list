import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {
	render() {
		return (
			<div>
				<input type="checkbox" onClick={() => this.props.itemCheckBoxClicked(this.props.parentId, this.props.id)} checked={this.props.done}/>
				<div>{this.props.dueDate}</div>
				<div className={'itemContent ' + (this.props.done ? 'done' : '')}>{this.props.content}</div>
				<div>{this.props.id}</div>
				<button onClick={() => this.props.removeItemButtonClicked(this.props.parentId, this.props.id)}>X</button>
			</div>
		);
	}
}
export default TodoItem;