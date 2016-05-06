import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import { Riddles } from '../../api/riddles.js';

import App from '../../ui/containers/App.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/' component={ App } riddles={ Riddles }/>
		</Router>,
		document.getElementById( 'render-target' )
	);
});