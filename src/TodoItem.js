import React, { Component } from 'react';

class TodoItem extends Component {
	render() {
		return (
			<div>
				<input type="checkbox" onClick={this.props.itemCheckBoxClicked} />
				<div>{this.props.dueDate}</div>
				<div>{this.props.content}</div>
				<div>{this.props.key}</div>
				<button onClick={this.props.removeItemButtonClicked}>X</button>
			</div>
		);
	}
}
export default TodoItem;