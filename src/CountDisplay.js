import React, { Component } from 'react';

class CountDisplay extends Component {
	render() {
		return (
			<div>
				<div>Done: {this.props.doneCount}</div>
				<div>Todo: {this.props.todoCount}</div>
			</div>
		);
	}
}

export default CountDisplay;