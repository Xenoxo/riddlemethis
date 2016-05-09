import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/containers/App.jsx';

import Submit from '../../ui/containers/Submit.jsx';
import RiddleContainer from '../../ui/containers/RiddleContainer.jsx';
import RiddleList from '../../ui/pages/RiddleList.jsx';

// import { HeaderBar } from '../../ui/containers/HeaderBar.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/' component={ App } >
				<IndexRoute component= { RiddleList } />
				<Route path='submit' component={ Submit }/>
			</Route>
			
		</Router>,
		document.getElementById( 'render-target' )
	);
});
