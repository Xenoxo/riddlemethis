import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

export class AnswerBox extends Component {

	// handleSubmitAnswer(event){
	// 	event.preventDefault();		
	// 	let userAnswer = this.userInput.value;

	// 	var createSubmitAsync = Meteor.wrapAsync('riddleanswer.check', this);
	// 	var result = createSubmitAsync(this.props.riddle._id, Meteor.user(), userAnswer);
	// 	//console.log(result);
	// 	// var createSubmit = Meteor.wrapAsync(riddleanswer.check, this.props.riddle._id, Meteor.user(), userAnswer);
		
	
	// 	// Session.set('isCorrect', Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer));
	// 	// var yo = Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer);

	// 	// Session.get('checkMethodResult');
	// }


	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = this.userInput.value;
		// let createSubmitAsync = Meteor.wrapAsync('riddleanswer.check');
		// let test = createSubmitAsync(this.props.riddle._id, Meteor.user(), userAnswer);
		// Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
		// 	function(error, result){
		// 		console.log("this is the result from within the callback " + result);
		// 		Session.set("isCorrect", result);
		// })

		// .then(function(){	console.log(Session.get('isCorrect'));});

		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer);

		// if (this.props.hasSolved.solved === true){
		// 	console.log("The riddle has now been solved and this shall return false");
		// } else {
		// 	console.log("The riddle has not been solved and this shall return true so as to remain open");
		// }
		
		// return this.props.hasSolved;
		
		// let test = Session.get('isCorrect');

		// Session.set('isCorrect', undefined);
		

//		console.log("This is test result = " + test);
	}

	// ORIGINAL

	// handleSubmitAnswer(event){
	// 	event.preventDefault();		
	// 	let userAnswer = this.userInput.value;
	// 	Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
	// 		function(error, result){
	// 			console.log("this is the result from within the callback " + result);
	// 			Session.set("isCorrect", result);
	// 	});
	// 	// let theTest = Session.get("isCorrect");
	// 	// console.log("this is theTest from AnswerBox " + theTest );
	// 	// return theTest;
	// }

	render(){
		//this.handleSubmitAnswer.bind(this)
			return (
				<div className={ this.props.className }>

						<form >
			        <input
			        	className="answer-input"
			          type="text"
			          ref = {(ref) => this.userInput = ref}
			          placeholder="Type your answers here!"
			        />
			    	
			      	<button
			      		type="submit"
			      		className="btn btn-success answer-submit"
			      		onClick={ this.props.onClick }
			      	>
			      		Submit
			      	</button>
				    
			      </form>
			      <form >
			      	<button onClick={ this.props.handleGiveUp } type="submit" className="btn btn-danger give-up">Give Up</button>
				    
			      </form>
					</div>
			)
	}
};

AnswerBox.propTypes = {
	className: React.PropTypes.string,
	riddle: React.PropTypes.object,
}
