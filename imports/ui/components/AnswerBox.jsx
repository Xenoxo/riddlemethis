import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class AnswerBox extends Component {

	handleSubmitAnswer(event){
		event.preventDefault();		
		let userAnswer = this.userInput.value;
		// let userAnswer = ReactDOM.findDOMNode(this.className.answer-input).value.trim();
		// (Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
		// 	function(error, result){
		// 		console.log(result);
		// 	}
		// )) ? console.log("yo") : console.log("butts")
  	console.log("this is the handleSubmitAnswer ");
  	console.log(userAnswer);
  	return true;
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
