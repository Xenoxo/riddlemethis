import React, { Component } from 'react';

export class RiddleContent extends Component {
	render(){
			return (
								<div className={this.props.className}>
									<h3>
										{this.props.riddle}
									</h3>
									<div className="riddle-details">
										Submitted by {this.props.username} on {this.props.date}
									</div>
								</div>
			)
	}
};

RiddleContent.propTypes = {
	riddle: React.PropTypes.array,
	className: React.PropTypes.string,
	riddle: React.PropTypes.object,
	username: React.PropTypes.string,
	date: React.PropTypes.string,
}

{/* OLD CODE THAT LIVED IN RIDDLE.JSX
	
								<div className="riddle-content">
									<h3>
										{this.props.riddle.riddle}
									</h3>
									<div className="riddle-details">
										Submitted by {this.props.riddle.username} on {this.props.riddle.submitted.toDateString()}
									</div>
								</div>
*/}