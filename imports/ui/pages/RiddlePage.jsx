import React, { Component } from 'react';
import Riddle from '../components/Riddle.jsx';

import RiddleListContainer from './RiddleListContainer.jsx';

export default class RiddlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortorder: -1,
    };
  }

	handleSort(){
		//console.log("this is the state "+(this.state.sortorder * 5));
  	this.setState({
  		sortorder: ((this.state.sortorder) * -1),
  	});
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
	  		<RiddleListContainer test={ this.state.sortorder }/>
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