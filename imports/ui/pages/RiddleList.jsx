import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import { createContainer } from 'meteor/react-meteor-data';

import Riddle from '../components/Riddle.jsx'


class RiddleList extends Component {


	upVote(){
		return console.log(this.currentUser._id);
	}

	renderRiddles() {
		return this.props.riddles.map((riddle) => (
			<Riddle 
				key={riddle._id}
				riddle={riddle}
				currentUser={this.props.currentUser}

				//not sure if below is needed
				currentUserId={this.props.currentUserId}
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

}

export default createContainer(() => {
  return {
  	riddles: Riddles.find({}).fetch(),
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
  };
}, RiddleList);


RiddleList.propTypes = {

}