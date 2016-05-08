import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// there is probably a better place to put this
// data, it shouldn't be passed in from this level
import { Riddles } from '../../api/riddles.js';

import App from '../../ui/containers/App.jsx';

import Submit from '../../ui/containers/Submit.jsx';
import RiddleContainer from '../../ui/containers/RiddleContainer.jsx';
import Navigation from '../../ui/components/navigation.jsx';
import RiddleList from '../../ui/pages/RiddleList.jsx';

// import { HeaderBar } from '../../ui/containers/HeaderBar.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path='/' component={ App } >
				<IndexRoute component= { RiddleList } riddles={ Riddles } />
				<Route path='submit' component={ Submit }/>
				<Route path='navigation' component={ Navigation }/>
			</Route>
			
		</Router>,
		document.getElementById( 'render-target' )
	);
});


// example below for ToDo list exports render Routes
// ------------------------------------------------ //

// import React from 'react';
// import { Router, Route, browserHistory } from 'react-router';

// // route components
// import AppContainer from '../../ui/containers/AppContainer.jsx';
// import ListContainer from '../../ui/containers/ListContainer.jsx';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
// import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';

// export const renderRoutes = () => (
//   <Router history={browserHistory}>
//     <Route path="/" component={AppContainer}>
//       <Route path="lists/:id" component={ListContainer}/>
//       <Route path="signin" component={AuthPageSignIn}/>
//       <Route path="join" component={AuthPageJoin}/>
//       <Route path="*" component={NotFoundPage}/>
//     </Route>
//   </Router>
// );