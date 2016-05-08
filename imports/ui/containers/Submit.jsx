import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';

export class Submit extends Component {
	render() {
		return (
			<div>This is the submit page
				<ul>
					<Link to="">
						Take me to the RiddleContainer Page
					</Link>
				</ul>
			</div>
		);
	}
}
