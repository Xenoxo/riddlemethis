import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

export class AnswerBox extends Component {

	handleSubmitAnswer(event){
		event.preventDefault();
		let userAnswer = this.userInput.value;
		Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer);
	}

	render(){
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
			      		className="btn btn-success answer-submit"
			      		onClick={ this.props.onClick }
			      		type="submit"
			      	>Submit</button>
				    
			      </form>
			      <form >
			      	<button 
			      		className="btn btn-danger give-up"
			      		onClick={ this.props.handleGiveUp }
			      		type="submit"			      		
			      	>Give Up</button>
				    
			      </form>
					</div>
			)
	}
};

AnswerBox.propTypes = {
	className: React.PropTypes.string,
	riddle: React.PropTypes.object,
}
