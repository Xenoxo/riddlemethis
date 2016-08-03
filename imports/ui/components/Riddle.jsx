// move most of this to Riddle Container and then separate parts into components

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Riddles } from '../../api/riddles';
import { createContainer } from 'meteor/react-meteor-data';


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

  getVotedStatus() {
  	return this.props.currentUser['listofvoted']
  }

  // (-) currently not being used
  // componentWillMount() {
  // 	if ( Meteor.user() && (this.props.currentUser['listofvoted'][this.props.riddle._id] !== undefined) ) {
  // 		let thisUser = this.props.currentUser;
  // 	}
  // }

  componentDidMount() {
  }
  
  toggleShowAnwerBox() {
  	this.setState({
  		showAnswerBox: !this.state.showAnswerBox,
  	})
  }

  //	
  //  If user has never voted on the riddle, then insert 
  //  entry into user collection under listofriddles obj
  //						-					-					-
  //  If already exists, then toggle the status of the 
  //  appropriate 'riddle id entry' and its upvoted value
  //  
	voteOnThisRiddle(){
		let newState;
		Meteor.call('riddlevote.flip', this.props.riddle._id, this.props.currentUser, 
			function(error,result){
				if (error){
					console.log(error);	
				}
				return result;
			}
		);
	}

	deleteThisRiddle(){	//Removes the given riddle from the backend
		Meteor.call('riddles.remove', this.props.riddle._id);
	}

	// (-) Don't think this method is needed
	// checkIfVoted(){ //check to see if user has voted at all on the riddle
	// 	return Meteor.call('riddlevote.check', this.props.riddle._id, this.props.currentUser);
	// }	

	// // (-) Don't think this method is needed
	// //use this method to change the state which will dictate what is to be shown
	// //regarding the answerbox
	// getUpvoted(){
	// 	//console.log(this.props.voteStatus[this.props.riddle._id]['upvoted']);
	// 	if (Meteor.user()) {
	// 		return this.props.voteStatus[this.props.riddle._id]['upvoted']; 
	// 	}
	// }

	handleGiveUp(event){
		event.preventDefault();
		console.log("this is the give up button " + ReactDOM.findDOMNode(this.refs.userAnswer).value.trim());
	}

	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = ReactDOM.findDOMNode(this.refs.userAnswer).value.trim();
		Meteor.call('riddleanswer.check', this.props.riddle._id, this.props.currentUser, userAnswer, 
			function(error, result){
				console.log(result);
			}
		);
		
		
	}

	render(){
		return (
			<div className="riddle-object">
			<div className="col-sm-12 riddle-container">
					<div 
						className={"upvote-box " + (Meteor.user() && this.props.voteStatus[this.props.riddle._id]['upvoted'] ? "upvoted" : "not-upvoted")} 
						onClick={this.voteOnThisRiddle.bind(this)}
					>
						<i className="fa fa-chevron-up"></i>
						<div className="vote-count">
							{this.props.riddle.upvotes}
						</div>
					</div>
					

					<div className="riddle-content">
						<h3>
							{this.props.riddle.riddle}
						</h3>
						<div className="riddle-details">
							Submitted by {this.props.riddle.username} on {this.props.riddle.submitted.toDateString()}
						</div>
					</div>


					<div className="solved-spacer">
						<button className="btn btn-primary" onClick={this.toggleShowAnwerBox.bind(this)}>
							<i className="fa fa-question fa-3x"></i>
						</button>
						{ this.props.currentUserId === this.props.riddle.author ? 
							<div className="delete" onClick={this.deleteThisRiddle.bind(this)}>
								delete
							</div> : ''
						}
					</div>
					{ 
						//	checks to see if ribbon is needed at all
						//
						Meteor.user() && (this.props.voteStatus[this.props.riddle._id]['solved'] !== undefined) ? 
						<div className="ribbon">
								<span className={(this.props.voteStatus[this.props.riddle._id]['solved'] ? "solved" : "revealed")}>Solved!</span>
						</div> : ''
					}
				</div>

				{ this.state.showAnswerBox ? 
					<div className="col-sm-12 answer-box">
						<form onSubmit={this.handleSubmitAnswer.bind(this)}>
			        <input
			        	className="answer-input"
			          type="text"
			          ref="userAnswer"
			          placeholder="Type your answers here!"
			        />
			    	
			      	<button
			      		type="submit"
			      		className="btn btn-success answer-submit"
			      	>
			      		Submit
			      	</button>
				    
			      </form>
			      <form onSubmit={this.handleGiveUp.bind(this)}>
			      	<button type="submit" className="btn btn-danger give-up">Give Up</button>
				    
			      </form>
					</div> : ''
				}
					
			</div>
			);
		}
}

// train of thought on figuring this out...
// trying to make non logged in user work correctly
// discovered that the below code is passing voteStatus while calling on Meteor.user() which returns undefined if user not logged in
// to fix - trying to store voteStatus:Meteor.user()['listofvoted']; in a variable so that I can mess with condidions before the return
// if I can store + conditions, then I can do a Meteor.user() check and only return if true

export default theRiddleContainer = createContainer(({ params }) => {
  let voteStatus;
  if (Meteor.user()){
  	voteStatus = Meteor.user()['listofvoted'];
  }
  
  console.log(voteStatus);
  return {
  	voteStatus,
    }

}, Riddle);