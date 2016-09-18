/*
  THIS IS A DATA CONTAINER FOR [[[ RiddleList.jsx ]]]
  This code allows RiddleList.jsx to have data 
  that is reactive
*/

import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import RiddleList from './RiddleList.jsx';
import { composeAll} from 'react-komposer'; 
import { composeWithTracker } from 'react-komposer';

// Composer needed in order for the data being composed
// to be reactive
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
  return () => { console.log( 'User container disposed!') };
};

const riddleComposer = function( props, onData ) {
	const handle = Meteor.subscribe('riddles');
  if ( handle.ready() ) {
    const riddles = Riddles.find({}).fetch();
    onData( null, {riddles} );
  } else {
  	console.log( 'not ready yet....this is where you put loading things' )
  }
  return () => { console.log( 'Riddle container disposed!') };
};

/*
  The code below takes the newly created reactive
  data sources above and 'pushes' them to RiddleList
*/
export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer),
)(RiddleList)

/*
  POTENTIAL IMPROVEMENTS
  - can constrain what is being subscribed to for faster loading
*/