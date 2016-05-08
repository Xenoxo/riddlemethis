import React, { Component } from 'react';
//import Riddle from './Riddle.jsx';

export default class RiddleContainer extends Component {

	renderRiddles(){
		return "gg";
	}

	render() {
		return (
				<div>
					This is the persistent header
					{this.props.children}
				</div>
		);
	}
}