import RiddlePage from './RiddlePage.jsx';
import RiddleList from './RiddleList.jsx';

import { Riddles } from '../../api/riddles.js';

import Containers from "meteor/utilities:react-list-container";
import { composeWithTracker } from 'react-komposer';
import { composeAll } from 'react-komposer'; 
// import { composeAll} from 'react-komposer'; 

// Composer needed in order for the data being composed
// to be reactive
const userComposer = function( props, onData ) {
	const handle = Meteor.subscribe( 'users' );

  if ( handle.ready() ) {
    // console.log( 'BUTTS' );
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

// export default composeWithTracker(userComposer)(RiddlePage);



export default composeAll(
  composeWithTracker(userComposer),
  composeWithTracker(riddleComposer)
)(RiddlePage);