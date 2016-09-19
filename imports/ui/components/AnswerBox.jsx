import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

export class AnswerBox extends Component {

	handleSubmitAnswer(event){
		event.preventDefault();		
		let userAnswer = this.userInput.value;
		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
			function(error, result){
				console.log("this is the result " + result);
				Session.set('checkMethodResult', result);
		})
		// var yo = Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer);
		return Session.get('checkMethodResult');
	}

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
			      <form onSubmit={ this.props.handleGiveUp }>
			      	<button type="submit" className="btn btn-danger give-up">Give Up</button>
				    
			      </form>
					</div>
			)
	}
};

AnswerBox.propTypes = {
	className: React.PropTypes.string,
	riddle: React.PropTypes.object,
}
