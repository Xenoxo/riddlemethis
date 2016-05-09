import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import { createContainer } from 'meteor/react-meteor-data';

import Riddle from '../components/Riddle.jsx'


class RiddleList extends Component {

	renderRiddles() {
		return this.props.riddles.map((riddle) => (
			<Riddle key={riddle._id} riddle={riddle}/>
		));
	}

	render() {
		return (
			<div>
	  		{ this.renderRiddles() }
			</div>
		);
	}
}

export default createContainer(() => {
  return {
    riddles: Riddles.find({}).fetch(),
  };
}, RiddleList);


RiddleList.propTypes = {

}