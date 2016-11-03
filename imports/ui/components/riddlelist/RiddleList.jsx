import React, { Component } from 'react';
import Riddle from '../riddle/Riddle.jsx'

export default class RiddleList extends Component {

	renderRiddles() {
		return this.props.riddles.map((riddle) => (
			<Riddle 
				key={riddle._id}
				riddle={riddle}
				// thisUser={this.props.thisUser}
			/>
		));
	}

	render() {
		return (
			<div>
	  		{ this.renderRiddles() }
			</div>
		);
	}

};


RiddleList.propTypes = {
	riddles: React.PropTypes.array
}