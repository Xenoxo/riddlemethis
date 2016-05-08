import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

export default class Submit extends Component {
	render() {
		return (
			<div>
			This is the submit page 
			<Link to="/navigation">Go to navigation</Link>
			</div>
		);
	}
}
