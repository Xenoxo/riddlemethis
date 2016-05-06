import React, { Component } from 'react';
import { Riddles } from '../imports/api/riddles';


export default class Riddle extends Component {
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
					Submitted by {this.props.riddle.author} on {this.props.riddle.submitted.toTimeString()}
					</div>
				</div>


				<div className="solved-spacer">
					<button className="btn btn-primary">
						<i className="fa fa-question fa-3x"></i>
					</button>
				 {/* <div className="ribbon"><span>Solved!</span></div>	*/}
				</div>	

			</div>	
		);
	}
} 