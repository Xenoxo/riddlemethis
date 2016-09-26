import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Riddles } from '../../api/riddles';
import { createContainer } from 'meteor/react-meteor-data';

import { RiddleContent } from './RiddleContent.jsx';
import { UpvoteBox } from './UpvoteBox.jsx';
import { SolvedSpacer } from './SolvedSpacer.jsx';
import { AnswerBox } from "./AnswerBox.jsx";

import { Session } from 'meteor/session';

export default class Riddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasVoted: false,
      showAnswerBox: false,
      solved: false,
      userAnswer:"",
    };
  }


  /*
   *If user has never voted on the riddle, then insert 
   *entry into user collection under listofriddles obj
   *    			-					-					-
   *If already exists, then toggle the status of the 
   *appropriate 'riddle id entry' and its upvoted value
   */  
	voteOnThisRiddle(){
		if (Meteor.user()) {
			Meteor.call('riddlevote.flip', this.props.riddle._id, Meteor.user(), 
				function(error,result){
					if (error){
						console.log(error);	
					}
					return result;
				}
			);
		} else {
			alert("Please login to vote.");
		}
	}

	/*
		Removes the given riddle from the backend and by proxy, the front end
	*/  
	deleteRiddle(){
		let confirmbox = confirm("Are you sure you want to delete this riddle?");
		if ( confirmbox) {
			Meteor.call('riddles.remove', this.props.riddle._id);	
		}
	}


	/*
		Checks to see if the current user has ever interacted with the riddle
	*/  
  hasInteracted() {
  	if (Meteor.user()){
	  	return this.props.voteStatus[this.props.riddle._id] !== undefined;
  	}
  	return false;
  }
  

	/*
		First checks to see if the user has ever interacted
		to avoid error calling .solved on undefined

		Checks to see if the current user has solved the riddle
	*/

  hasSolved() {
		if(!this.hasInteracted())
			return !this.hasInteracted();
		return (Meteor.user() && this.props.voteStatus[this.props.riddle._id].solved === undefined);
  }

	/*
		Toggles the status of the answer box
	*/  
  toggleAnswerBox() {
  	if ( Meteor.user() ) {
	  	this.setState({
	  		showAnswerBox: !this.state.showAnswerBox,
	  	})
	  } else {
	  	alert("Please login to solve.");
	  }
  }

	/*
		Handles the result of the user clicking "give up" on the riddle
	*/
	handleGiveUp(event){
		event.preventDefault();
		let confirmbox = confirm("Are you sure you want to see the answer?");
		if ( confirmbox ) {
			Meteor.call('riddleanswer.reveal', this.props.riddle._id, Meteor.user(), 
				function(error, result){
					console.log(result);
					window.alert(result);
				}
			);
	  	this.setState({
	  		showAnswerBox: false,
	  	});
		}
	}

	/*
		Handles the event of the user clicking submit, uses ref to call method in child component
	*/
	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = this.myTextInput.userInput.value;
		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer);
	}

	render(){
		return (
			<div className="riddle-object">
				<div className={"col-sm-12 riddle-container"}>
					<UpvoteBox
						className={"upvote-box " + (this.hasInteracted() ? ( Meteor.user() && this.props.voteStatus[this.props.riddle._id]['upvoted'] ? "upvoted" : "not-upvoted" ) : "not-upvoted")}
						upvotes={this.props.riddle.upvotes}
						upvoteHandler={this.voteOnThisRiddle.bind(this)}
					/>

					<RiddleContent
						className="riddle-content"
						riddle={this.props.riddle.riddle}
						username={this.props.riddle.username}
						date={this.props.riddle.submitted.toDateString()}
					/>

					<SolvedSpacer
						className="solved-spacer"
						isAuthor={ Meteor.userId() === this.props.riddle.author }
						toggleAnswerBoxHandler={ this.toggleAnswerBox.bind(this) }
						deleteRiddleHandler={ this.deleteRiddle.bind(this) }
					/>
					
					{ // CODE FOR RIBBON
						this.hasInteracted() && ( Meteor.user() && (this.props.voteStatus[this.props.riddle._id]['solved'] !== undefined) ) ? 
						<div className="ribbon">
								<span className={(this.props.voteStatus[this.props.riddle._id]['solved'] ? "solved" : "revealed")}>Solved!</span>
						</div> : ''
						// END OF CODE FOR RIBBON
					} 
				</div>

				{ this.state.showAnswerBox && this.hasSolved() ?
				<AnswerBox
					className="col-sm-12 answer-box"
					riddle={this.props.riddle}
					onClick={ this.handleSubmitAnswer.bind(this) }
					hasSolved={ this.props.voteStatus[this.props.riddle._id]}
					handleGiveUp={ this.handleGiveUp.bind(this) }
					ref={ (ref) => this.myTextInput = ref }
				/> : ''
				}
			</div>
			);
		}
}

export default theRiddleContainer = createContainer(({ params }) => {
  let voteStatus;
  if (Meteor.user()){
  	voteStatus = Meteor.user()['listofvoted'];
  }
  return {
  	voteStatus,
   }

}, Riddle);