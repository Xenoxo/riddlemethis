import { Riddles } from '../../api/riddles.js';
import React, { Component } from 'react';
import RiddleList from '../pages/RiddleList.jsx';
import { composeWithTracker } from 'react-komposer';
import { composeAll} from 'react-komposer';



const userComposer = function( props, onData ) {
	const handle = Meteor.subscribe( 'users' );
  if ( handle.ready() ) {
		if ( Meteor.user() ) {
	    const thisuser = Meteor.users.find( Meteor.user()._id ).fetch();
	    onData( null, {thisuser} );
    } else {
    	const allusers = Meteor.users.find().fetch();	
    	onData( null, {allusers} );
    }
  } else {
  	
  	console.log( 'not ready yet....this is where you put loading things' )
  }

  return () => { console.log( 'Container disposed!') };
};


// export default RiddleContainer = createContainer(({ params }) => {
// 	let riddleSubscription = Meteor.subscribe('riddles');
//   const ready1 = Meteor.subscribe('users');
//   const { id } = params;
//   return {	
// 	  	riddles: Riddles.find({}).fetch(),
// 	    currentUser: Meteor.user(),
// 	    currentUserId: Meteor.userId(),
// 	    voteStatus: this.thisUser,
//     }

// }, RiddleList);

const riddleComposer = function( props, onData ) {
	const handle = Meteor.subscribe('riddles');
  if ( handle.ready() ) {
    const riddles = Riddles.find({}).fetch();
    onData( null, {riddles} );

  } else {
  	
  	console.log( 'not ready yet....this is where you put loading things' )
  }

  return () => { console.log( 'Container disposed!') };
};


export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer),
)(RiddleList)



// old working code
//
// export default composeWithTracker(composer)(RiddleList);