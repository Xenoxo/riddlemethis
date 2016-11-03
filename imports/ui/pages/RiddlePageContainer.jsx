/*
  THIS IS A DATA CONTAINER FOR [[[ RiddlePage.jsx ]]]
  This code allows RiddleList.jsx to have data 
  that is reactive - was orginally part of a single
  container within RiddleListContainer but had to 
  split due to wanting to sort
*/

import React, { Component } from 'react';
import RiddlePage from './RiddlePage.jsx';
import { composeAll} from 'react-komposer'; 
import { composeWithTracker } from 'react-komposer';

// Composer needed in order for the data being composed
// to be reactive
const userComposer = function( props, onData ) {
	const handle = Meteor.subscribe( 'users' );
  if ( handle.ready() ) {
    console.log( 'BUTTS' );
		if ( Meteor.user() ) {
	    const thisuser = Meteor.users.find( Meteor.user()._id ).fetch();
	    onData( null, {thisuser} );
    } else {
    	const allusers = Meteor.users.find().fetch();	
    	onData( null, {allusers} );
    }
  } else {
  	console.log( 'not ready yet....from RiddlePageContainer' )
  }
  return () => { console.log( 'User container disposed!') };
};

export default composeWithTracker(userComposer)(RiddlePage);
