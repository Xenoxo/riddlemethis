import React, { Component } from 'react';

export class SolvedSpacer extends Component {
	render(){
		return (
			<div className={ this.props.className }>
				<button className="btn btn-primary" onClick={ this.props.toggleAnswerBoxHandler }>
					<i className="fa fa-question fa-3x"></i>
				</button>
				{ this.props.isAuthor ? 
					<div className="delete" onClick={ this.props.deleteRiddleHandler }>
						delete
					</div> : ''
				}
			</div>			
		)
	}
}

SolvedSpacer.propTypes = {
	className: React.PropTypes.string,
	isAuthor: React.PropTypes.bool,
}
