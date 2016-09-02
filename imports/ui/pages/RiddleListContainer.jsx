
import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import RiddleList from './RiddleList.jsx';
import { composeAll} from 'react-komposer'; 
import { composeWithTracker } from 'react-komposer';



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


export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer),
)(RiddleList)
