import React, { Component } from 'react';
import Riddle from './Riddle.jsx';

export default class RiddleContainer extends Component {

	renderRiddles(){
		console.log(Riddles.find());
		return "gg";
	}

	render() {
		return (
				<div>
					<Riddle />
				</div>
		);
	}
}