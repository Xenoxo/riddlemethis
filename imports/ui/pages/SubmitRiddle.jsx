import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link, browserHistory } from 'react-router';

import { Riddles } from '../../api/riddles.js';

import { Meteor } from 'meteor/meteor';

import Alert from 'react-s-alert';

export default class SubmitRiddle extends Component {
		
	
	handleSubmit(event){
		event.preventDefault();
		
		// needs to refactor to allow parsing of retrieved content into array
		let theRiddle = ReactDOM.findDOMNode(this.refs.theRiddle).value.trim();		
		let tempAnswer = ReactDOM.findDOMNode(this.refs.theAnswer).value.trim();
		let theAnswer = tempAnswer.split(",");
		if (theRiddle !== '' && theAnswer !== ''){
			Meteor.call('riddles.insert', theRiddle, theAnswer, function (error, result){
				if(error !== undefined || result !== undefined){ //used to log errors or results
					console.log("the error = " + error);
				}

			});
	    browserHistory.push('/');			
		} else {
			Alert.warning('Riddle and answer can\'t be blank.', {
	      position: 'top-right',
	      effect: 'scale',
	      beep: false,
	      timeout: 3000,
	      offset: 35,
		   });
		}
	}

	render() {
		return (
	      <form className="new-riddle" onSubmit={this.handleSubmit.bind(this)} >
	      	<fieldset className="form-group">
	      		<label>What is your riddle?</label>
		        <input
		        	className="answer-input form-control form-control-lg"
		          type="text"
		          ref="theRiddle"
		          placeholder="Type your riddle here!"
		        />
	        </fieldset>
	        <fieldset className="form-group">
		        <label>What is the answer to your riddle?</label>
		        <input
		        	className="answer-input form-control form-control-lg"
		          type="text"
		          ref="theAnswer"
		          placeholder="Type your answers here!"
		        />
			      <small className="text-muted">If your riddle has more than one answer, use commas to separate them.</small>
	        </fieldset>
	        <button type="submit" className="btn btn-primary btn-submit-riddle">Submit</button>
	      </form>
		);
	}
}
