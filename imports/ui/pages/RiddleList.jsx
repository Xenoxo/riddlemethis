import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import { createContainer } from 'meteor/react-meteor-data';

import Riddle from '../components/Riddle.jsx'


class RiddleList extends Component {
	
	isOwner() {
		let user = this.props.currentUser._id;
		let theOwner = this.props.riddles.owner;
		console.log(this.props.currentUser);
		console.log(this.props.currentUser._id);
		// console.log("currentUser is " + user + " and riddleOwner is " + theOwner);
		// console.log(user === theOwner);
		// return (this.props.currentUser._id === this.props.riddle.author);
		return user;
	}

	onDelete(){	
		return console.log("this is the id yo ");
	}

	onUpVote(){
		return console.log(this.currentUser._id);
	}

	renderRiddles() {
		return this.props.riddles.map((riddle) => (
			<Riddle 
				key={riddle._id}
				riddle={riddle}
				currentUser={this.props.currentUser}
				onDelete={() => this.onDelete()}
				// isOwner={this.isOwner()}
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
  };
}, RiddleList);


RiddleList.propTypes = {

}