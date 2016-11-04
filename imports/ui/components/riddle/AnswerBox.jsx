import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';

export class AnswerBox extends Component {
	render(){
			let lgClose = () => this.setState({ lgShow: false });
			return (
				<div className={this.props.className}>
					<div className="content">
						<input
			        	className="answer-input"
			          type="text"
			          ref = {(ref) => this.userInput = ref}
			          placeholder="  Type your guess here!"
			        />
			      <div className="answer-button-container">      
			        
							<button 
			      		className="btn btn-danger give-up"
			      		onClick={ this.props.handleGiveUp }
			      		type="submit"
			      	>I give up.</button>

			      
			 			   <button
			      		className="btn answer-submit"
			      		onClick={ this.props.onClick }
			      		type="submit"
			      	>Solve</button>
			      </div>
			      <div/>
					</div>
				</div>
			)
	}
};

AnswerBox.propTypes = {
	className: React.PropTypes.string,
	riddle: React.PropTypes.object,
}
