import React, { Component } from 'react';
//export const Index = () => <h3>Index</h3>;

export default class Index extends Component {
	log() {
		console.log('yo');
	}

	render() {
		return (
			<div>index {this.log()}</div>
		);
	}
} 
/* 
import React from 'react';

export const Index = () => <h3>Index</h3>;

*/