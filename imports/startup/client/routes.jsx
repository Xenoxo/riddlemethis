import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/layouts/App.jsx';
import RiddleListContainer from '../../ui/pages/RiddleListContainer.jsx';
import SubmitRiddle from '../../ui/pages/SubmitRiddle.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/' component={ App } >
				<IndexRoute component= { RiddleListContainer } />
				<Route path='submit-riddle' component={ SubmitRiddle }/>
			</Route>
			
		</Router>,
		document.getElementById( 'render-target' )
	);
});
