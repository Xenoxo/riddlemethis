import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

export class AnswerBox extends Component {
	// handleSubmitAnswer(event){
	// 	event.preventDefault();		
	// 	let userAnswer = ReactDOM.findDOMNode(this.refs.userAnswer).value.trim();
	// 	Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
	// 		function(error, result){
	// 			console.log(result);
	// 		}
	// 	);
	// }		
	render(){
			return (
				<div className={ this.props.className }>
						<form onSubmit={ this.props.handleSubmitAnswer }>
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
			      <form onSubmit={ this.props.handleGiveUp }>
			      	<button type="submit" className="btn btn-danger give-up">Give Up</button>
				    
			      </form>
					</div>
			)
	}
};

AnswerBox.propTypes = {
	className: React.PropTypes.string,
}
