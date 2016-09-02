import React, { Component } from 'react';
import RiddleList from '../pages/RiddleList.jsx';
import { composeWithTracker } from 'react-komposer';
import { composeAll} from 'react-komposer';

function composer( props, onData ) {
	const handle = Meteor.subscribe( 'users' );
  if ( handle.ready() ) {
		if ( Meteor.user() ) {
	    const thisuser = Meteor.users.find( Meteor.user()._id ).fetch();
	    onData( null, {thisuser} );
    } else {
    	const allusers = Meteor.users.find().fetch();	
    	onData( null, {allusers} );
    }
    onData
  } else {
  	
  	console.log( 'not ready yet....this is where you put loading things' )
  }

  return () => { console.log( 'Container disposed!') };
};


export default composeAll(
  composeWithTracker(composer),
)(RiddleList)

// export default composeAll(
//   composeWithTracker(composer),
//   composeWithTracker(composer)
// )(RiddleList)

// old working code
//
// export default composeWithTracker(composer)(RiddleList);