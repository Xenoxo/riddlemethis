import React, { Component } from 'react';
import Riddle from '../components/Riddle.jsx'

export default class RiddleList extends Component {

	renderRiddles() {
		return this.props.riddles.map((riddle) => (
			<Riddle 
				key={riddle._id}
				riddle={riddle}
			/>
		));
	}

	render() {
		return (
			<div>
				{ Meteor.user() ? <div>Sort by...<a className="sortButton" href="#" >Post Date <i className="fa fa-caret-down" aria-hidden="true"></i></a></div> : '' }
	  		{ this.renderRiddles() }
			</div>
		);
	}

};


RiddleList.propTypes = {
	riddles: React.PropTypes.array.isRequired,
}