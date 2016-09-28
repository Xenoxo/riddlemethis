import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/layouts/App.jsx';
import RiddleListContainer from '../../ui/pages/RiddleListContainer.jsx';

import SubmitRiddle from '../../ui/pages/SubmitRiddle.jsx';
import RiddlePage from '../../ui/pages/RiddlePage.jsx';

// used for testing
import RiddleList from '../../ui/pages/RiddleList.jsx';


Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/(:postlimit)' component={ App } >
				<IndexRoute component={ RiddlePage } />
				<Route path='/#/submit-riddle' component={ SubmitRiddle }/>
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
});
