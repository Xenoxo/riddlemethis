// move most of this to Riddle Container and then separate parts into components

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Riddles } from '../../api/riddles';
import { createContainer } from 'meteor/react-meteor-data';

import { RiddleContent } from './RiddleContent.jsx';
import { UpvoteBox } from './UpvoteBox.jsx';
import { SolvedSpacer } from './SolvedSpacer.jsx';
import { AnswerBox } from "./AnswerBox.jsx";


export default class Riddle extends Component {
  
  //in ES6 constructor == componentWillMount()
  constructor(props) {
    super(props);
    console.log();
    this.state = {
      hasVoted: false,
      showAnswerBox: false,
      solved: false,
    };
  }

  /*
  	If user has never voted on the riddle, then insert 
  	entry into user collection under listofriddles obj
  					-					-					-
  	If already exists, then toggle the status of the 
  	appropriate 'riddle id entry' and its upvoted value
  */  
	voteOnThisRiddle(){
		let newState;
		Meteor.call('riddlevote.flip', this.props.riddle._id, Meteor.user(), 
			function(error,result){
				if (error){
					console.log(error);	
				}
				return result;
			}
		);
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
			console.log("this is hasvoted " + this.props.riddle._id === this.props.voteStatus[this.props.riddle._id]);
	  	return this.props.voteStatus[this.props.riddle._id] !== undefined;
  	}
  	return false;
  }
  
	/*
		Toggles the status of the answer box
	*/  
  toggleAnswerBox() {
  	this.setState({
  		showAnswerBox: !this.state.showAnswerBox,
  	})
  }

	/*
		Handles the result of the user clicking "give up" on the riddle
	*/
	handleGiveUp(event){
		event.preventDefault();
		console.log("this is the give up button " + ReactDOM.findDOMNode(this.refs.userAnswer).value.trim());
		Meteor.call('riddleanswer.reveal', this.props.riddle._id, Meteor.user(), 
			function(error, result){
				console.log(result);
				window.alert(result);
			}
		);
	}

	/*
		Handles the result of the user clicking "submit" on the riddle
	*/
	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = ReactDOM.findDOMNode(this.refs.userAnswer).value.trim();
		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
			function(error, result){
				console.log(result);
			}
		);
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
							isAuthor= { Meteor.userId() === this.props.riddle.author }
							toggleAnswerBoxHandler={ this.toggleAnswerBox.bind(this) }
							deleteRiddleHandler={ this.deleteRiddle.bind(this) }
						/>
						
						{ //	checks to see if ribbon is needed at all
							this.hasInteracted() && ( Meteor.user() && (this.props.voteStatus[this.props.riddle._id]['solved'] !== undefined) ) ? 
							<div className="ribbon">
									<span className={(this.props.voteStatus[this.props.riddle._id]['solved'] ? "solved" : "revealed")}>Solved!</span>
							</div> : ''
						}
					</div>

				{ this.state.showAnswerBox ? 
					<AnswerBox
						className="col-sm-12 answer-box"
						handleSubmitAnswer={ this.handleSubmitAnswer.bind(this) }
						handleGiveUp = { this.handleGiveUp.bind(this) }
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