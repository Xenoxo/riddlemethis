import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class AnswerBox extends Component {
  testMethod(){
  	console.log("this is the test method");
  	return true;
  }
	// handleSubmitAnswer(event){
	// 	event.preventDefault();		
	// 	let userAnswer = ReactDOM.findDOMNode(this.refs.userAnswer).value.trim();
	// 	(Meteor.call('riddleanswer.check', this.props.riddle._id, Meteor.user(), userAnswer, 
	// 		function(error, result){
	// 			console.log(result);
	// 		}
	// 	)) ? console.log("yo") : console.log("butts")
	// }
	// // componentDidMount(){
	// // 	let test = ReactDOM.findDOMNode(this.refs.answerbox);
	// // 	console.log("from the answerbox "+test);
	// // }	

	render(){
		//this.handleSubmitAnswer.bind(this)
			return (
				<div className={ this.props.className }>

						<form >
			        <input
			        	className="answer-input"
			          type="text"
			          ref="theanswerbox"
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
