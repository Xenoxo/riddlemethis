import React, { Component } from 'react';

export class UpvoteBox extends Component {
	render(){
		return (			
			<div className={this.props.className} onClick={this.props.upvoteHandler}>
				<i className="fa fa-chevron-up"></i>
				<div className="vote-count">
					{this.props.upvotes}
				</div>
			</div>
		)
	}
}

UpvoteBox.propTypes = {
	className: React.PropTypes.string,
	upvotes: React.PropTypes.number,
}

{/*

<div 
	className={"upvote-box " + (this.hasInteracted() ? ( Meteor.user() && this.props.voteStatus[this.props.riddle._id]['upvoted'] ? "upvoted" : "not-upvoted" ) : "not-upvoted")} 
	onClick={this.voteOnThisRiddle.bind(this)} >
	<i className="fa fa-chevron-up"></i>
	<div className="vote-count">
		{this.props.riddle.upvotes}
	</div>
</div>

*/}