import React, { Component } from 'react';

export class AnswerBox extends Component {
	render(){
			return (
				<div className={ this.props.className }>
						<form onSubmit={this.props.handleSubmitAnswer}>
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


									{/* <div className="col-sm-12 answer-box">
						<form onSubmit={this.handleSubmitAnswer.bind(this)}>
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
			      <form onSubmit={this.handleGiveUp.bind(this)}>
			      	<button type="submit" className="btn btn-danger give-up">Give Up</button>
				    
			      </form>
					</div> */} 