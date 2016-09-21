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
  //in ES6 constructor == componentWillMount()
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
  	//console.log("this is hasInteracted "+ Meteor.user());
  	if (Meteor.user()){
	  	return this.props.voteStatus[this.props.riddle._id] !== undefined;
  	}
  	return false;
  }
  

	/*
		Checks to see if the current user has ever interacted with the riddle
	*/  
  hasSolved() {

  	if (Meteor.user() && this.props.voteStatus[this.props.riddle._id].solved !== undefined) {
  		return !this.props.voteStatus[this.props.riddle._id].solved;
  	}
  	return true;
  	//console.log("this is hasInteracted "+ Meteor.user());
  	// if (){
	  // 	return false;
  	// }
 
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


	handleSubmitAnswer(event){
		event.preventDefault();
		this.setState({
  		showAnswerBox: this.myTextInput.handleSubmitAnswer(event),
  	});	
		console.log();
		// console.log(ReactDOM.findDOMNode(this.refs.answerbox));
		// console.log(userAnswer);
		// var checkresponse = this.myTextInput;
		// var showBox = checkresponse.handleSubmitAnswer(event);
		// var test = Session.get('checkMethodResult');
		// console.log("this is from Riddle.jsx "+ test);


		// while( Session.get("isCorrect") === undefined ){
		// 	console.log("cumon");
		// }
		// let result = Session.get("isCorrect");
		// Session.set("isCorrect", undefined);
		// if ( result )
		// 	console.log("YAY! here is the result " + result);
		// else if (result === false)
		// 	console.log("Riddle.jsx sees failed")
		// else
		// 	console.log("dafuq is result... " + result)

		// if(checkresponse.handleSubmitAnswer(event)){
	 //  	this.setState({
	 //  		showAnswerBox: false,
	 //  	});
		// }


		// console.log(ReactDOM.findDOMNode(this.refs.answerbox));
    // if (this.myTextInput !== null) {
    //   this.myTextInput.focus();
    // }		
	}
	

	componentDidMount(){
		let test = ReactDOM.findDOMNode(this.refs.doodly);
  	//console.log("from after the didmount " + test);
  	this.setState({
  		userAnswer: test,
  	})
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

				{ this.state.showAnswerBox && this.hasSolved()?
				<AnswerBox
					className="col-sm-12 answer-box"
					riddle={this.props.riddle}
					onClick={ this.handleSubmitAnswer.bind(this) }
					hasSolved={ this.props.voteStatus[this.props.riddle._id]}
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