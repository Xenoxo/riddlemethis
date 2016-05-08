import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import Riddle from '../components/Riddle.jsx'
import { createContainer } from 'meteor/react-meteor-data';


class RiddleList extends Component {
	logMe() {
		return console.log(this.props.riddles);
	}

	renderRiddle() {
		return this.props.riddles.map((riddle) => (
			<Riddle key={riddle._id} riddle={riddle}/>
		));
	}

	render() {
		return (
			<div>
	  		{ this.renderRiddle() }
			</div>
		);
	}
}

export default createContainer(() => {
  return {
    riddles: Riddles.find({}).fetch(),
  };
}, RiddleList);