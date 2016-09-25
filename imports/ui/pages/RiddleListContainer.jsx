import React, { Component } from 'react';
import { Riddles } from '../../api/riddles.js';
import RiddleList from './RiddleList.jsx';
import { composeAll } from 'react-komposer'; 
import { composeWithTracker } from 'react-komposer';
import Containers from "meteor/utilities:react-list-container";


/*
  THIS IS A DATA CONTAINER FOR [[[ RiddleList.jsx ]]]
  This code allows RiddleList.jsx to have data 
  that is reactive
*/

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


/*
  Props passed in comes from Riddle page and determines the how
  the collection is accessed such that sorting is implemented
*/
const riddleComposer = function( props, onData ) {
  const handle = Meteor.subscribe('riddles');
  Tracker.autorun(() => {
    const isReady = handle.ready();
    console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);  
  });

  if ( handle.ready() ) {
      let sortby = props.sortby
      let sortorder = props.sortorder
      let innerquery = {};
      innerquery[sortby] = sortorder;
      let sorttext = "sort";
      let sortquery = {};
      sortquery[sorttext] = innerquery;

      console.log(sortquery);

    if ( props.sortorder === -1 ){
      let riddles = Riddles.find({}, sortquery).fetch();
      console.log("sortquery");
      onData( null, {riddles} );      
    } else {
      let riddles = Riddles.find({}, sortquery).fetch();
      onData( null, {riddles} );
    }    
  } else {
    console.log( 'not ready yet....this is where you put loading things' )
  }
  return () => { console.log( 'Riddle container disposed!') };

}

/*
  The code below takes the newly created reactive
  data sources above and 'pushes' them to RiddleList
*/
export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer)
)(RiddleList);

/*
  POTENTIAL IMPROVEMENTS
  - can constrain what is being subscribed to for faster loading
*/
