import React, { Component } from 'react';

export class RiddleContent extends Component {
	render(){
			return (
				<div className={this.props.className}>
					<h3>
						{this.props.riddle}
					</h3>
					<div className="riddle-details">
						<div>
						 {this.props.date}
						</div>
						<div>
							By {this.props.username}
						</div>
					</div>
				</div>
			)
	}
};

RiddleContent.propTypes = {
	className: React.PropTypes.string,
	riddle: React.PropTypes.string,
	username: React.PropTypes.string,
	date: React.PropTypes.string,
}
