import React, { Component } from 'react';

export class UpvoteBox extends Component {
	render(){
		return (			
			<div className={this.props.className} onClick={this.props.upvoteHandler}>
				<i className="fa fa-caret-up"></i>
				<div className="vote-count">
					{this.props.upvotes}
				</div>
				<div></div>
			</div>
		)
	}
}

UpvoteBox.propTypes = {
	className: React.PropTypes.string,
	upvotes: React.PropTypes.number,
}
