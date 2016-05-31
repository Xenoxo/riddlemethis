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
	  		{ this.renderRiddles() }
			</div>
		);
	}

}

export default RiddleContainer = createContainer(({ params }) => {
	const riddleSubscription = Meteor.subscribe('riddles');
  const ready1 = Meteor.subscribe('users');
  
  // const upvotedStatus = Meteor.user()
  
  const { id } = params;
  //console.log("from RiddleList " + params);
  
  // const theUser = Meteor.users.findOne(Meteor.userId());
  return {	
	  	riddles: Riddles.find({}).fetch(),
	    currentUser: Meteor.user(),
	    currentUserId: Meteor.userId(),

	    // pass in the user's specific query of riddles

	    // 1. pass in the entire listofvoted
	    // for some reason this causes an error......
	    voteStatus: this.thisUser,
    }

}, RiddleList);


RiddleList.propTypes = {

}