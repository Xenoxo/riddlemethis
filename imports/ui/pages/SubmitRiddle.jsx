import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import { Riddles } from '../../api/riddles.js';
import { browserHistory } from 'react-router';

export default class SubmitRiddle extends Component {
	
	handleSubmit(event){
		event.preventDefault();

		const theRiddle = ReactDOM.findDOMNode(this.refs.theRiddle).value.trim();
		
		// needs to refactor to allow parsing of retrieved content into array
		const theAnswer = ReactDOM.findDOMNode(this.refs.theAnswer).value.trim();

		if (theRiddle !== '' && theAnswer !== ''){
	    Riddles.insert({
	      riddle: theRiddle,
				answers: theAnswer,
				reveals: 0,
				solves: 0,
				author: Meteor.userId(),
				username: Meteor.user().username,
				submitted: new Date(),
				upvotes: 0,
				difficulty: 0,
	    });
	 
	    // Clear form
	    ReactDOM.findDOMNode(this.refs.theRiddle).value = '';
	    ReactDOM.findDOMNode(this.refs.theAnswer).value = '';
	    browserHistory.push('/');			
		} else {
			console.log('the Riddle and Answer can\'t be blank' );
		}
	}

	render() {
		return (
			<div>
	      <form className="new-riddle" onSubmit={this.handleSubmit.bind(this)} >
	      	<fieldset className="form-group">
	      		<label>What is your riddle?</label>
		        <input
		        	className="form-control form-control-lg"
		          type="text"
		          ref="theRiddle"
		          placeholder="Type your riddle here!"
		        />
	        </fieldset>
	        <fieldset className="form-group">
		        <label>What is the answer to your riddle?</label>
		        <input
		        	className="form-control form-control-lg"
		          type="text"
		          ref="theAnswer"
		          placeholder="Type your answers here!"
		        />
			      <small class="text-muted">If your riddle has more than one answer, use commas to separate them.</small>
	        </fieldset>
{/*}	        <h3>What is the answer to your riddle? (If more than one answer, use commas to separate them.)</h3>

	        <input
	          type="text"
	          ref="textInput"
	          placeholder="Type to add new tasks"
	        />	        */}
	          <button type="submit" className="btn btn-primary">Submit</button>
	      </form>
			</div>
		);
	}
}
