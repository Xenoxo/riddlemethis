import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '../../ui/containers/App.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/' component={ App } />
		</Router>,
		document.getElementById( 'render-target' )
	);
});
