import React, { Component } from 'react';
import Riddle from '../components/Riddle.jsx';

import RiddleListContainer from './RiddleListContainer.jsx';

export default class RiddlePage extends Component {

	handleSort(){
		console.log("works!");
	}
	render() {
		// console.log("from riddlePage "+ this.props.thisuser);
		// console.log("from riddlePage Meteor.user() "+ Meteor.user());

		return (
			<div>
					<div>Sort by...
						<a className="sortButton" onClick={this.handleSort.bind(this) } >
							Post Date <i className="fa fa-caret-down" aria-hidden="true"></i>
						</a>
					</div>		
	  		<RiddleListContainer test={ true }/>
			</div>
		);
	}
};


RiddlePage.propTypes = {
	//riddles: React.PropTypes.array.isRequired,
}

{/*
				{ Meteor.user() ? 
					<div>Sort by...
						<a className="sortButton" onClick={this.handleSort.bind(this) } >
							Post Date <i className="fa fa-caret-down" aria-hidden="true"></i>
						</a>
					</div> : '' 
				}

*/}