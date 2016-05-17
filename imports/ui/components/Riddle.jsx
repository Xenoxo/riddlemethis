// move most of this to Riddle Container and then separate parts into components

import React, { Component } from 'react';
import { Riddles } from '../../api/riddles';


export default class Riddle extends Component {

	deleteThisRiddle(){	
		Meteor.call('riddles.remove', this.props.riddle._id);
		return console.log("this is the id yo ");
	}	

	render(){
		return (
			<div className="col-sm-12 riddle-container">
				

				<div className="upvote-box">
					<i className="fa fa-chevron-up"></i>
					<div className="vote-count">
						{this.props.riddle.upvotes}
					</div>
				</div>
				

				<div className="riddle-content">
					<h3>
					{this.props.riddle.riddle}
					</h3>
					<div className="riddle-details">
					Submitted by {this.props.riddle.username} on {this.props.riddle.submitted.toDateString()}
					</div>
				</div>


				<div className="solved-spacer">
				{/*console.log(this.props.currentUser)*/}
					<button className="btn btn-primary">
						<i className="fa fa-question fa-3x"></i>
					</button>
					{ true ? 
					<div className="delete" onClick={this.deleteThisRiddle.bind(this)}>
						delete
					</div> : ''
					}
				</div>	

			</div>	
		);
	}
} 