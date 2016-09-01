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
				voteStatus={this.props.voteStatus}

				//not sure if below is needed
				currentUserId={this.props.currentUserId}
			/>
		));
	}

	render() {
		return (
			<div>
				{ Meteor.user() ? <div>Sort by...<a className="sortButton" href="#" >Post Date <i className="fa fa-caret-down" aria-hidden="true"></i></a></div> : '' }
	  		{ this.renderRiddles() }
			</div>
		);
	}

}

export default RiddleContainer = createContainer(({ params }) => {
	let riddleSubscription = Meteor.subscribe('riddles');
  const ready1 = Meteor.subscribe('users');
  const { id } = params;
  return {	
	  	riddles: Riddles.find({}).fetch(),
	    currentUser: Meteor.user(),
	    currentUserId: Meteor.userId(),
	    voteStatus: this.thisUser,
    }

}, RiddleList);


RiddleList.propTypes = {

}