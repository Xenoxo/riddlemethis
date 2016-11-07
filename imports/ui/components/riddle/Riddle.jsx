import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Riddles } from '../../../api/riddles';
import { createContainer } from 'meteor/react-meteor-data';

import { RiddleContent } from './RiddleContent.jsx';
import { UpvoteBox } from './UpvoteBox.jsx';
import { SolvedSpacer } from './SolvedSpacer.jsx';
import { AnswerBox } from "./AnswerBox.jsx";

import { Session } from 'meteor/session';

import Alert from 'react-s-alert';

export default class Riddle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasVoted: false,
      showAnswerBox: false,
      solved: false,
      userAnswer:"",
    };
    this.date = this.props.riddle.submitted;
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
			Alert.info('Please login to vote.', {
	      position: 'top-right',
	      effect: 'scale',
	      beep: false,
	      timeout: 3000,
	      offset: 35,
		   });
		}
	}

	/*
		Removes the given riddle from the backend and by proxy, the front end
	*/  
	deleteRiddle(){
		Meteor.call('riddles.remove', this.props.riddle._id);	
	}


	/*
		Checks to see if the current user has ever interacted with the riddle
	*/  
  hasInteracted() {
  	if (Meteor.user()){
	  	return Meteor.user()['listofvoted'][this.props.riddle._id] !== undefined;
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
		return (Meteor.user() && Meteor.user()['listofvoted'][this.props.riddle._id].solved === undefined);
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
			Alert.info('Please login to solve.', {
	      position: 'top-right',
	      effect: 'scale',
	      beep: false,
	      timeout: 3000,
	      offset: 35,
		   });
		}
	 }
  

	/*
		Handles the result of the user clicking "give up" on the riddle
	*/
	handleGiveUp(event){
		event.preventDefault();
			Meteor.call('riddleanswer.reveal', this.props.riddle._id, Meteor.user(), 
				function(error, result){
					if (error) {
						console.log(error);
					} else {
		        Alert.error('Ah, tough one! The answer was: <h2>'+result+'</h2>', {
			        position: 'top-right',
			        effect: 'scale',
			        beep: false,
			        timeout: 'none',
			        offset: 35,
			        html: true
		        });							
					}
				}
			);
	  	this.setState({
	  		showAnswerBox: false,
	  	});
	}

	/*
		Handles the event of the user clicking submit, uses ref to call method in child component
	*/
	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = this.myTextInput.userInput.value;
		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, (err, res)=>{
			if (err) {
				console.log(err);
			} else if (!res) {
        Alert.info('Good try, but that\'s not it. Try again!', {
	        position: 'top-right',
	        effect: 'scale',
	        beep: false,
	        timeout: 3000,
	        offset: 35,
        });				
			} else {
        Alert.success('Congrats! You got it!', {
	        position: 'top-right',
	        effect: 'scale',
	        beep: false,
	        timeout: 3000,
	        offset: 35,
        });				
			}

		});
	}

	getDate(){
		return (this.date.getMonth() + 1) + '-' + this.date.getDate() + '-' +  this.date.getFullYear()
	}
	render(){
		return (
			<div className="riddle-object">
				<div className={"col-sm-12 riddle-container"}>
					<UpvoteBox
						className={"upvote-box " + (this.hasInteracted() ? ( Meteor.user() && Meteor.user()['listofvoted'][this.props.riddle._id]['upvoted'] ? "upvoted" : "not-upvoted" ) : "not-upvoted")}
						upvotes={this.props.riddle.upvotes}
						upvoteHandler={this.voteOnThisRiddle.bind(this)}
					/>

					<RiddleContent
						className="riddle-content"
						riddle={this.props.riddle.riddle}
						username={this.props.riddle.username}
						date={this.getDate()}
					/>

					<SolvedSpacer
						isAuthor={ Meteor.userId() === this.props.riddle.author }
						toggleAnswerBoxHandler={ this.toggleAnswerBox.bind(this) }
						deleteRiddleHandler={ this.deleteRiddle.bind(this) }
					/>
					
					{ // CODE FOR RIBBON
						this.hasInteracted() && ( Meteor.user() && (Meteor.user()['listofvoted'][this.props.riddle._id]['solved'] !== undefined) ) ? 
						<div className="ribbon">
								<span className={(Meteor.user()['listofvoted'][this.props.riddle._id]['solved'] ? "solved" : "revealed")}>Solved!</span>
						</div> : ''
						// END OF CODE FOR RIBBON
					} 
				</div>

				{ this.state.showAnswerBox && this.hasSolved() ?
				<AnswerBox
					className="col-sm-12 answer-box-container"
					riddle={this.props.riddle}
					onClick={ this.handleSubmitAnswer.bind(this) }
					hasSolved={ Meteor.user()['listofvoted'][this.props.riddle._id]}
					handleGiveUp={ this.handleGiveUp.bind(this) }
					ref={ (ref) => this.myTextInput = ref }
				/> : ''
				}
			</div>
			);
		}
}
